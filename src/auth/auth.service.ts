import { Inject, Injectable } from '@nestjs/common';
import { RegisterArgs } from './args/RegisterArgs';
import { UserService } from '../user/user.service';
import { CustomException } from '../common/CustomException';
import * as jwt from 'jsonwebtoken';
import { Tokens } from './models/tokens';
import { LoginArgs } from './args/LoginArgs';

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  private readonly jwtSecret: string = 'JWT_SECRET';

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

  async register(args: RegisterArgs): Promise<Tokens> {
    const isExist = await this.userService.findOneByEmail(args);

    if (isExist) {
      throw new CustomException('Email already exist');
    }

    const user = await this.userService.createOne(args);
    if (!user) {
      throw new Error();
    }
    const accessToken = await this.generateAccessToken(user._id.toString());
    const refreshToken = await this.generateRefreshToken(user._id.toString());

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
