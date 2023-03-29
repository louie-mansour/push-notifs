import { UserUseCase } from '../usecase/UserUseCase';
import express from 'express';
import { Schedule } from "../domain/User";

export class UserController {
    constructor(private readonly userUseCase: UserUseCase) {}

    async loginCallback(req: express.Request, res: express.Response) {
        const code = req.query.code as string;
        const { accessToken, user } = await this.userUseCase.login(code);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
        });
        return res.redirect(`http://localhost:3000/user/${user.id}`);
    }

    async logout(req: express.Request, res: express.Response) {
        res.clearCookie('accessToken');
        return res.redirect('http://localhost:3000');
    }

    async getUser(req: express.Request, res: express.Response) {
        const userId = req.headers['X-User-Id'] as string;
        const user = await this.userUseCase.getUser(userId);
        return res.send({
            isAnonymous: false,
            user: {
                id: user.id,
                contact: {
                    email: user.contact.email,
                    isEmailVerified: !!user.contact.emailVerified,
                    isEmailEnabled: user.contact.isEmailEnabled,
                    phone: user.contact.phone,
                    isPhoneVerified: !!user.contact.phoneVerified,
                    isPhoneEnabled: user.contact.isPhoneEnabled,
                },
                schedule: user.schedule,
                keywords: user.keywords,
            }
        });
    }
}
interface ContactResponseDto {
    readonly email: string;
    readonly isEmailVerified: boolean;
    readonly phone: string | undefined;
    readonly isPhoneVerified: boolean;
}

interface UserResponseDto {
    readonly id: string;
    readonly contact: ContactResponseDto;
    readonly schedule: Schedule;
    readonly keywords: string[];
}