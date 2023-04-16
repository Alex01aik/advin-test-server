import { Inject, Injectable } from '@nestjs/common';
import { RegisterArgs } from './args/RegisterArgs';
import { UserService } from '../user/user.service';
import { CompanyService } from '../company/company.service';
import { CustomException } from '../common/CustomException';
// import * as jwt from 'jsonwebtoken';
import { LoginArgs } from './args/LoginArgs';
import type { Multer } from 'multer';
import { S3Service } from '../s3/s3.service';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import * as dotenv from 'dotenv';
import { MockAuthRes } from './models/MockAuthRes';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(CompanyService) private readonly companyService: CompanyService,
    @Inject(S3Service) private readonly s3Service: S3Service,
  ) {}

  private readonly jwtSecret: string = process.env.JWT_SECRET;
  // TODO tokens
  // async generateAccessToken(userId: string): Promise<string> {
  //   const payload = { sub: userId };
  //   const options = { expiresIn: '10m' };
  //   return jwt.sign(payload, this.jwtSecret, options);
  // }
  // TODO tokens
  // async generateRefreshToken(userId: string): Promise<string> {
  //   const payload = { sub: userId };
  //   const options = { expiresIn: '30d' };
  //   return jwt.sign(payload, this.jwtSecret, options);
  // }

  async register(args: RegisterArgs, file?: Multer.File): Promise<MockAuthRes> {
    const isExist = await this.userService.findOneByEmail(args);

    console.log('register after isExist');

    if (isExist) {
      throw new CustomException('Email already exist');
    }

    if (args.role === 'company') {
      if (!file) {
        throw new CustomException('Upload doc for register company');
      }
      const fileData: ManagedUpload.SendData = await this.s3Service.uploadFile(
        file,
        args.name,
      );

      const company = await this.companyService.createOne({
        name: args.name,
        doc: fileData.Key,
      });
      if (!company) {
        throw new Error();
      }

      const user = await this.userService.createOne({
        ...args,
        company: company._id,
      });
      if (!user) {
        throw new Error();
      }
    } else {
      const user = await this.userService.createOne(args);
      if (!user) {
        throw new Error();
      }
    }

    return {
      isAuth: true,
    };
    // TODO tokens
    // const accessToken = await this.generateAccessToken(user._id.toString());
    // const refreshToken = await this.generateRefreshToken(user._id.toString());

    // return {
    //   accessToken,
    //   refreshToken,
    // };
  }

  async login(args: LoginArgs, isAdmin?: boolean): Promise<MockAuthRes> {
    const user = await this.userService.findOne(args);

    if (!user) {
      throw new CustomException('Wrong credentials');
    }

    if (isAdmin) {
      if (user.role !== 'admin') {
        throw new CustomException('Permissions denied');
      }
    }

    return {
      isAuth: true,
    };
    // TODO tokens
    // const accessToken = await this.generateAccessToken(user._id.toString());
    // const refreshToken = await this.generateRefreshToken(user._id.toString());

    // return {
    //   accessToken,
    //   refreshToken,
    // };
  }

  // TODO tokens
  // refreshToken(): string {
  //   return 'refreshToken';
  // }
}
