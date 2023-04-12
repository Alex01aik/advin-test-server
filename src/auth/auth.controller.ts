import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginArgs } from './args/LoginArgs';
import { RegisterArgs } from './args/RegisterArgs';
import { Tokens } from './models/tokens';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterArgs): Promise<Tokens> {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginArgs): Promise<Tokens> {
    return this.authService.login(body);
  }
}
