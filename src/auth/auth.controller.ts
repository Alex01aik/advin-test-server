import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginArgs } from './args/LoginArgs';
import { RegisterArgs } from './args/RegisterArgs';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { MockAuthRes } from './models/MockAuthRes';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  register(
    @Body() body: RegisterArgs,
    @UploadedFile() file?: Multer.File,
  ): Promise<MockAuthRes> {
    console.log('register controller');
    return this.authService.register(body, file);
  }

  @Post('login')
  login(@Body() body: LoginArgs): Promise<MockAuthRes> {
    return this.authService.login(body);
  }

  @Post('adminlogin')
  adminlogin(@Body() body: LoginArgs): Promise<MockAuthRes> {
    return this.authService.login(body, true);
  }
}
