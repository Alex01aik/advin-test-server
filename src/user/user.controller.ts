import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from '../schema/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findMany')
  async findMany(): Promise<UserDocument[]> {
    return this.userService.findMany();
  }
}
