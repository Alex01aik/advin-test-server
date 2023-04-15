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
import { Tokens } from './models/tokens';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  register(
    @Body() body: RegisterArgs,
    @UploadedFile() file?: Multer.File,
  ): Promise<Tokens> {
    return this.authService.register(body, file);
  }

  @Post('login')
  login(@Body() body: LoginArgs): Promise<Tokens> {
    return this.authService.login(body);
  }
}
