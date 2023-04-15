import { Inject, Injectable } from '@nestjs/common';
import { RegisterArgs } from './args/RegisterArgs';
import { UserService } from '../user/user.service';
import { CompanyService } from '../company/company.service';
import { CustomException } from '../common/CustomException';
import * as jwt from 'jsonwebtoken';
import { Tokens } from './models/tokens';
import { LoginArgs } from './args/LoginArgs';
import type { Multer } from 'multer';
import { S3Service } from '../s3/s3.service';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(CompanyService) private readonly companyService: CompanyService,
    @Inject(S3Service) private readonly s3Service: S3Service,
  ) {}

  private readonly jwtSecret: string = process.env.JWT_SECRET;

  async generateAccessToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    const options = { expiresIn: '10m' };
    return jwt.sign(payload, this.jwtSecret, options);
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    const options = { expiresIn: '30d' };
    return jwt.sign(payload, this.jwtSecret, options);
  }

  async register(args: RegisterArgs, file?: Multer.File): Promise<Tokens> {
    const isExist = await this.userService.findOneByEmail(args);

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
      const user = await this.userService.createOne(args);
      if (!user) {
        throw new Error();
      }
      const company = await this.companyService.createOne({
        name: args.name,
        doc: fileData.Location,
        userId: user._id.toString(),
      });
      if (!company) {
        throw new Error();
      }
    }

    const accessToken = await this.generateAccessToken('user._id.toString()');
    const refreshToken = await this.generateRefreshToken('user._id.toString()');

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(args: LoginArgs): Promise<Tokens> {
    const user = await this.userService.findOne(args);

    if (!user) {
      throw new CustomException('Wrong credentials');
    }

    const accessToken = await this.generateAccessToken(user._id.toString());
    const refreshToken = await this.generateRefreshToken(user._id.toString());

    return {
      accessToken,
      refreshToken,
    };
  }

  // TODO
  // refreshToken(): string {
  //   return 'refreshToken';
  // }
}
