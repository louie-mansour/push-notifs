import { AppInfoUseCase } from "../usecase/AppInfoUseCase";
import jwt_decode from 'jwt-decode';

import express from "express";
export class AppInfoController {
    constructor(private readonly appInfoUseCase: AppInfoUseCase) {}
    async appInfo(req: express.Request, res: express.Response) {
        const authHeader = req.headers.Authorization as string
        if (!authHeader) {
            return res.send(this.appInfoUseCase.appInfo());
        }
        const decoded = jwt_decode(authHeader.split(' ')[1]) as any
        return res.send(this.appInfoUseCase.appInfo(decoded.push_notifs_uuid));
    }
}
