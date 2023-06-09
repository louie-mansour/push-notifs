import { Contact, Schedule, User } from '../domain/User';
import { PostgresqlRepo } from '../repo/PostgresqlRepo';
import { Auth0Service } from '../service/auth/Auth0Service';
import { InvalidOperationError } from "../error/InvalidOperationError";
import { SendGridService } from "../service/sendgrid/SendGridService";
import { TwilioService } from "../service/twilio/TwilioService";
import { Verification } from "../domain/Verification";

export class UserUseCase {
    constructor(
        private readonly auth0Service: Auth0Service,
        private readonly postgresqlRepo: PostgresqlRepo,
        private readonly sendGridService: SendGridService,
        private readonly twilioService: TwilioService,
    ) {}

    public async login(authorizationCode: string): Promise<{ accessToken: string, user: User }> {
        const { accessToken, user } = await this.auth0Service.exchange(
            authorizationCode,
        );
        await this.postgresqlRepo.loginUser(user);
        return { accessToken, user };
    }

    public async getUser(userId: string): Promise<User> {
        return await this.postgresqlRepo.getUser(userId);
    }

    public async changeEmail(userId: string, newEmail: string): Promise<Contact> {
        const verificationCode = Verification.generateCode();
        const contact = new Contact({
            userId: userId,
            email: newEmail,
            emailVerified: undefined,
            isEmailEnabled: false,
        })

        const updatedContact = await this.postgresqlRepo.changeEmail(contact, verificationCode);
        await this.sendGridService.sendVerificationEmail(newEmail, verificationCode);
        return updatedContact;
    }

    public async verifyEmail(userId: string, verificationCode: string): Promise<Contact> {
        return await this.postgresqlRepo.verifyEmail(userId, verificationCode);
    }

    public async enableEmail(userId: string, isEnable: boolean): Promise<Contact> {
        const user = await this.postgresqlRepo.getUser(userId)
        if (!user.contact.emailVerified) {
            throw new InvalidOperationError(`Cannot enable unverified email ${user.contact.email} for user ${user.id}`)
        }
        return await this.postgresqlRepo.enableEmail(userId, isEnable);
    }

    public async changePhone(userId: string, newPhone: string): Promise<Contact> {
        const verificationCode = Verification.generateCode();
        const contact = new Contact({
            userId: userId,
            phone: newPhone,
            phoneVerified: undefined,
            isPhoneEnabled: false,
        })
        await this.twilioService.sendVerificationSMS(newPhone, verificationCode);
        return await this.postgresqlRepo.changePhone(contact, verificationCode);
    }

    public async verifyPhone(userId: string, verificationCode: string): Promise<Contact> {
        return await this.postgresqlRepo.verifyPhone(userId, verificationCode);
    }

    public async enablePhone(userId: string, isEnable: boolean): Promise<Contact> {
        const user = await this.postgresqlRepo.getUser(userId)
        if (!user.contact.phoneVerified) {
            throw new InvalidOperationError(`Cannot enable unverified phone ${user.contact.phone} for user ${user.id}`)
        }
        return await this.postgresqlRepo.enablePhone(userId, isEnable);
    }

    public async setSchedule(schedule: Schedule): Promise<Schedule> {
        return await this.postgresqlRepo.updateSchedule(schedule);
    }

    public async setKeywords(keywords: string[], userId: string): Promise<string[]> {
        return await this.postgresqlRepo.updateKeywords(keywords, userId);
    }
}
