import { InvalidInputError } from '../error/InvalidInputError';

export class User {
    static readonly ANONYMOUS = 'anon'
    readonly id: string;
    readonly contact: Contact;
    readonly keywords: string[];
    readonly schedule: Schedule;
    readonly name: string | undefined;
    readonly loginDatetime: Date | undefined;
    constructor(user: {
        id: string;
        contact: Contact
        keywords: string[];
        schedule: Schedule;
        name?: string;
        loginDatetime?: Date;
    }) {
        this.id = user.id;
        this.keywords = this.validateKeywords(user.keywords || []);
        this.contact = user.contact;
        this.schedule = user.schedule;
        this.name = user.name;
        this.loginDatetime = this.validateLoginDatetime(user.loginDatetime);
    }

    private validateLoginDatetime(date: Date | undefined): Date | undefined {
        if (!date) {
            return undefined;
        }
        if (date > new Date()) {
            throw new InvalidInputError(
                `last login date ${date} cannot be in the future`,
            );
        }
        return date;
    }

    private validateKeywords(keywords: string[]): string[] {
        keywords.forEach((keyword) => {
            if (keyword.length > 50) {
                throw new InvalidInputError(
                    `keyword ${keyword} cannot be larger than 50 characters`,
                );
            }
        })
        return keywords;
    }
}

export class Contact {
    readonly userId: string;
    readonly email: string | undefined;
    readonly emailVerified: Date | undefined;
    readonly isEmailEnabled: boolean;
    readonly phone: string | undefined;
    readonly phoneVerified: Date | undefined;
    readonly isPhoneEnabled: boolean;

    constructor(contact: {
        userId: string;
        email?: string;
        emailVerified?: Date;
        isEmailEnabled?: boolean;
        phone?: string;
        phoneVerified?: Date;
        isPhoneEnabled?: boolean;
    }) {
        this.userId = contact.userId;
        this.email = this.validateEmail(contact.email);
        this.emailVerified = this.validateEmailVerified(contact.emailVerified);
        this.isEmailEnabled = contact.isEmailEnabled ?? false;
        this.phone = this.validatePhone(contact.phone);
        this.phoneVerified = this.validatePhoneVerified(contact.phoneVerified);
        this.isPhoneEnabled = contact.isPhoneEnabled ?? false;
    }

    private validateEmail(email: string): string {
        if (!email) {
            return undefined;
        }
        if (!Contact.emailRegex.test(email)) {
            throw new InvalidInputError(
                `email '${email}' does not follow regex pattern '${Contact.emailRegexPattern}'`,
            );
        }
        return email;
    }

    private validatePhone(phoneInput: string | undefined): string | undefined {
        if (!phoneInput) {
            return undefined;
        }
        const phoneNumber = phoneInput.replace(/\D/g, '');
        if (phoneNumber.length != 10) {
            throw new InvalidInputError(
                `phone number '${phoneInput}' is not 10 digits long`,
            );
        }
        return phoneNumber;
    }

    private validateEmailVerified(date: Date | undefined): Date | undefined {
        if (!date) {
            return undefined;
        }

        if (date > new Date()) {
            throw new InvalidInputError(
                `email verified date ${date} cannot be in the future`,
            );
        }
        return date;
    }

    private validatePhoneVerified(date: Date | undefined): Date | undefined {
        if (!date) {
            return undefined;
        }

        if (date > new Date()) {
            throw new InvalidInputError(
                `phone verified date ${date} cannot be in the future`,
            );
        }
        return date;
    }

    private static emailRegexPattern =
        "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
    private static emailRegex = new RegExp(Contact.emailRegexPattern);
}

export class Schedule {
    readonly userId: string;
    // We use Date here, but we really want is time and timezone
    readonly time: Date;
    readonly sunday: boolean;
    readonly monday: boolean;
    readonly tuesday: boolean;
    readonly wednesday: boolean;
    readonly thursday: boolean;
    readonly friday: boolean;
    readonly saturday: boolean;

    constructor(schedule: {
        userId: string,
        time?: Date,
        sunday?: boolean,
        monday?: boolean,
        tuesday?: boolean,
        wednesday?: boolean,
        thursday?: boolean,
        friday?: boolean,
        saturday?: boolean,
    }) {
        this.userId = schedule.userId
        this.time = schedule.time ?? new Date();
        this.sunday = schedule.sunday ?? false
        this.monday = schedule.monday ?? true
        this.tuesday = schedule.tuesday ?? true
        this.wednesday = schedule.wednesday ?? true
        this.thursday = schedule.thursday ?? true
        this.friday = schedule.friday ?? true
        this.saturday = schedule.saturday ?? false
    }
}