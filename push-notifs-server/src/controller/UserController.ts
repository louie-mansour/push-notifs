import { UserUseCase } from '../usecase/UserUseCase';
import express from 'express';
import { Contact, Schedule, User } from "../domain/User";
import { SendGridService } from "../service/sendgrid/SendGridService";

export class UserController {
    constructor(
        private readonly userUseCase: UserUseCase) {}

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
            user: this.userToDto(user)
        });
    }

    async changeEmail(req: express.Request, res: express.Response) {
        const userId = req.headers['X-User-Id'] as string;
        const email = req.body.email;
        const contact = await this.userUseCase.changeEmail(userId, email);

        return res.send({
            contact: this.contactToDto(contact)
        });
    }

    async verifyEmail(req: express.Request, res: express.Response) {
        const userId = req.headers['X-User-Id'] as string;
        const verificationCode = req.body.verification_code;
        const contact = await this.userUseCase.verifyEmail(userId, verificationCode)

        return res.send({
            contact: this.contactToDto(contact)
        });
    }

    async enableEmail(req: express.Request, res: express.Response) {
        const userId = req.headers['X-User-Id'] as string;
        const isEnable = req.param('isEnable').toLowerCase() === 'true'
        const contact = await this.userUseCase.enableEmail(userId, isEnable);

        return res.send({
            contact: this.contactToDto(contact)
        });
    }

    async changePhone(req: express.Request, res: express.Response) {
        const userId = req.headers['X-User-Id'] as string;
        const email = req.body.phone;
        const contact = await this.userUseCase.changePhone(userId, email);

        return res.send({
            contact: this.contactToDto(contact)
        });
    }

    async verifyPhone(req: express.Request, res: express.Response) {
        const userId = req.headers['X-User-Id'] as string;
        const verificationCode = req.body.verification_code;
        const contact = await this.userUseCase.verifyPhone(userId, verificationCode)

        return res.send({
            contact: this.contactToDto(contact)
        });
    }

    async enablePhone(req: express.Request, res: express.Response) {
        const userId = req.headers['X-User-Id'] as string;
        const isEnable = req.param('isEnable').toLowerCase() === 'true'
        const contact = await this.userUseCase.enablePhone(userId, isEnable);

        return res.send({
            contact: this.contactToDto(contact)
        });
    }

    async setSchedule(req: express.Request, res: express.Response) {
        const userId = req.headers['X-User-Id'] as string;
        const scheduleFromRequest = req.body.schedule;
        const schedule = this.dtoToSchedule(scheduleFromRequest, userId);
        const updatedSchedule = await this.userUseCase.setSchedule(schedule);
        return res.send({
            schedule: this.scheduleToDto(updatedSchedule)
        });
    }

    async setKeywords(req: express.Request, res: express.Response) {
        const userId = req.headers['X-User-Id'] as string;
        const keywords = req.body.keywords;
        const updatedKeywords = await this.userUseCase.setKeywords(keywords, userId);
        return res.send({
            keywords: updatedKeywords,
        });
    }

    private userToDto(user: User): UserResponseDto {
        return {
            id: user.id,
            contact: this.contactToDto(user.contact),
            schedule: this.scheduleToDto(user.schedule),
            keywords: user.keywords,
        }
    }

    private contactToDto(contact: Contact): ContactResponseDto {
        return {
            email: contact.email,
            isEmailVerified: !!contact.emailVerified,
            isEmailEnabled: contact.isEmailEnabled,
            phone: contact.phone,
            isPhoneVerified: !!contact.phoneVerified,
            isPhoneEnabled: contact.isPhoneEnabled,
        }
    }

    private scheduleToDto(schedule: Schedule): ScheduleResponseDto {
        return {
            time: schedule.time.toISOString(),
            sunday: schedule.sunday,
            monday: schedule.monday,
            tuesday: schedule.tuesday,
            wednesday: schedule.wednesday,
            thursday: schedule.thursday,
            friday: schedule.friday,
            saturday: schedule.saturday,
        }
    }

    private dtoToSchedule(scheduleDto: ScheduleResponseDto, userId): Schedule {
        return new Schedule({
            userId: userId,
            time: new Date(scheduleDto.time),
            sunday: scheduleDto.sunday,
            monday: scheduleDto.monday,
            tuesday: scheduleDto.tuesday,
            wednesday: scheduleDto.wednesday,
            thursday: scheduleDto.thursday,
            friday: scheduleDto.friday,
            saturday: scheduleDto.saturday,
        });
    }
}
interface ContactResponseDto {
    readonly email: string;
    readonly isEmailVerified: boolean;
    readonly isEmailEnabled: boolean;
    readonly phone: string | undefined;
    readonly isPhoneVerified: boolean;
    readonly isPhoneEnabled: boolean;
}

interface ScheduleResponseDto {
    readonly time: string;
    readonly sunday: boolean;
    readonly monday: boolean;
    readonly tuesday: boolean;
    readonly wednesday: boolean;
    readonly thursday: boolean;
    readonly friday: boolean;
    readonly saturday: boolean;
}

interface UserResponseDto {
    readonly id: string;
    readonly contact: ContactResponseDto;
    readonly schedule: ScheduleResponseDto;
    readonly keywords: string[];
}