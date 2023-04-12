import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/schemas/user.schema';
import { CreateOneUserDto } from './args/CreateOneUserDto';
import { FindOneUserByEmailDto } from './args/FindOneUserByEmailDto';
import { FindOneUserDto } from './args/FindOneUserDto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createOne(args: CreateOneUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(args);
    await createdUser.save();
    await this.userModel.createIndexes();

    return createdUser;
  }

  async findOne(args: FindOneUserDto): Promise<UserDocument> {
    const searchArgs = Object.entries(args).map(([key, value]) => ({
      [key]: value,
    }));

    return await this.userModel.findOne({
      $and: searchArgs,
    });
  }

  async findOneByEmail(args: FindOneUserByEmailDto): Promise<UserDocument> {
    return await this.userModel.findOne({
      email: args.email,
    });
  }

  async findMany(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }
}
