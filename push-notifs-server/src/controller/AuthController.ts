import { UserUseCase } from '../usecase/UserUseCase';
import express from 'express';

export class AuthController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async callback(req: express.Request, res: express.Response) {
    const code = req.query.code as string;
    const accessToken = await this.userUseCase.login(code);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: 'localhost:4000',
    });
    res.redirect('http://localhost:3000');
  }
}
