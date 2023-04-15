import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from '../schema/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findMany')
  async findMany(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<UserDocument[]> {
    return this.userService.findMany(page, limit);
  }
}
