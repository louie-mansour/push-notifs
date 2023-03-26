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
        });
        return res.redirect('http://localhost:3000');
    }

    static AuthHeaderFromCookie(req: express.Request, res: express.Response, next: express.NextFunction) {
        const cookieHeader = req.header('cookie');
        if (!cookieHeader) {
            return next();
        }
        const authCookie = cookieHeader.split(';').filter(c => c.trim().startsWith('accessToken'))
        if (authCookie.length === 0) {
            return next();
        }
        const authCookieKeyValue = authCookie[0].split('=', 2)
        if (authCookieKeyValue.length < 2) {
            return next();
        }
        const authCookieValue = authCookieKeyValue[1]
        req.headers['Authorization'] = `Bearer ${authCookieValue}`;
        return next();
    }
}
