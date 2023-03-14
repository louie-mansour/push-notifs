import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserUseCase } from '../usecase/UserUseCase';
import { User } from '../domain/User';

@Controller()
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post('/user')
  async createUser(@Body('user') user): Promise<User> {
    const newUser = new User({
      ...user,
      id: undefined,
    });
    return await this.userUseCase.createUser(newUser);
  }

  @Put('/user/:id')
  async updateUser(@Param('id') userId, @Body('user') user): Promise<User> {
    const newUser = new User({
      ...user,
      id: userId,
    });
    return await this.userUseCase.updateUser(newUser);
  }

  @Get('/user/:id')
  async getUser(@Param('id') userId): Promise<User> {
    return await this.userUseCase.getUser(userId);
  }
}
