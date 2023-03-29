import { UserUseCase } from '../usecase/UserUseCase';
import express from 'express';
import jwt_decode from 'jwt-decode';

export class AuthController {
    constructor(private readonly userUseCase: UserUseCase) {}

    static AuthHeaderFromCookie(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.headers['authorization']) {
            return next();
        }

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
        req.headers['authorization'] = `bearer ${authCookieValue}`;
        return next();
    }

    static XUserIdFromAuthHeader(req: express.Request, res: express.Response, next: express.NextFunction) {
        const authHeader = req.headers['authorization'] as string
        if (!authHeader) {
            req.headers['X-User-Id'] = undefined;
            return next();
        }

        const accessTokenValues = authHeader.split(' ', 2)
        if (accessTokenValues.length !== 2) {
            req.headers['X-User-Id'] = undefined;
            return next();
        }

        const accessToken = accessTokenValues[1]
        const decodedAccessTokenToken = jwt_decode(accessToken) as any;
        const userId = decodedAccessTokenToken.push_notifs_uuid;
        req.headers['X-User-Id'] = userId;
        return next();
    }
}
