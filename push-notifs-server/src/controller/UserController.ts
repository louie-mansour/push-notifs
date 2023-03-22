import { UserUseCase } from '../usecase/UserUseCase';
import { User } from '../domain/User';
import express from 'express';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  // async createUser(req: express.Request): Promise<User> {
  //   const user = req.body.user;
  //   const newUser = new User({
  //     ...user,
  //     id: undefined,
  //   });
  //   return await this.userUseCase.createUser(newUser);
  // }

  async updateUser(req: express.Request): Promise<User> {
    const user = req.body.user;
    const userId = req.params.id;
    const newUser = new User({
      ...user,
      id: userId,
    });
    return await this.userUseCase.updateUser(newUser);
  }

  async getUser(req: express.Request): Promise<User> {
    const userId = req.params.userId;
    return await this.userUseCase.getUser(userId);
  }
}
