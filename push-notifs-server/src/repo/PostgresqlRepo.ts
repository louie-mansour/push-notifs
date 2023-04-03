import { Contact, Schedule, User } from '../domain/User';
import { Pool } from 'pg';
import { DatabaseError } from '../error/DatabaseError';

export class PostgresqlRepo {
    private readonly pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: 'push_notifs',
            host: 'db',
            database: 'push_notifs',
            password: 'push_notifs',
            port: 5432,
        });
    }

    private LOGIN_UPSERT_USER_SQL =
        `INSERT INTO users (id, email, email_verified, is_email_enabled, phone, phone_verified, is_phone_enabled, keywords, schedule, login_datetime, created_datetime, modified_datetime)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT (email) DO
        UPDATE SET login_datetime = EXCLUDED.login_datetime
        RETURNING *;`;
    public async loginUser(user: User): Promise<User> {
        const now = new Date();
        const res = await this.query(
            this.LOGIN_UPSERT_USER_SQL,
            [
                user.id,
                user.contact.email,
                user.contact.emailVerified,
                user.contact.isEmailEnabled,
                user.contact.phone,
                user.contact.phoneVerified,
                user.contact.isPhoneEnabled,
                JSON.stringify(user.keywords),
                JSON.stringify(user.schedule),
                user.loginDatetime,
                now,
                now,
            ]
        )
        const row = res.rows[0];
        return this.rowToUser(row);
    }


    private READ_USER_SQL = `SELECT * FROM users WHERE id = $1`;
    public async getUser(userId: string): Promise<User> {
        const res = await this.query(this.READ_USER_SQL, [userId])
        const row = res.rows[0];
        return this.rowToUser(row);
    }

    private CHANGE_USER_EMAIL_SQL =
        `UPDATE users SET (email, email_verified, is_email_enabled, email_verification_code, modified_datetime)
        = ($1, $2, $3, $4, $5)
        WHERE id = $6
        RETURNING *;`;
    public async changeEmail(contact: Contact, verificationCode: string): Promise<Contact> {
        const { userId, email, emailVerified, isEmailEnabled } = contact;
        const res = await this.query(
            this.CHANGE_USER_EMAIL_SQL,
            [
                email,
                emailVerified,
                isEmailEnabled,
                verificationCode,
                new Date(),
                userId
            ]
        )
        const row = res.rows[0];
        return this.rowToContact(row);
    }

    private VERIFY_USER_EMAIL_SQL =
        `UPDATE users SET (email_verified, modified_datetime)
        = ($1, $2)
        WHERE id = $3 AND email_verification_code = $4
        RETURNING *;`;
    public async verifyEmail(userId: string, verificationCode: string): Promise<Contact> {
        const now = new Date();
        const res = await this.query(
            this.VERIFY_USER_EMAIL_SQL,
            [
                now,
                now,
                userId,
                verificationCode,
            ]
        )
        // TODO: Count the rows updated
        const row = res.rows[0];
        return this.rowToContact(row);
    }

    private ENABLE_USER_EMAIL_SQL = `
        UPDATE users SET (is_email_enabled, modified_datetime)
        = ($1, $2)
        WHERE id = $3
        RETURNING *;`;
    public async enableEmail(userId: string, isEnable: boolean): Promise<Contact> {
        const res = await this.query(this.ENABLE_USER_EMAIL_SQL, [isEnable, new Date(), userId])
        const row = res.rows[0];
        return this.rowToContact(row);
    }

    private CHANGE_USER_PHONE_SQL =
        `UPDATE users SET (phone, phone_verified, is_phone_enabled, phone_verification_code, modified_datetime)
        = ($1, $2, $3, $4, $5)
        WHERE id = $6
        RETURNING *;`;
    public async changePhone(contact: Contact, verificationCode: string): Promise<Contact> {
        const { userId, phone, phoneVerified, isPhoneEnabled } = contact;
        const res = await this.query(
            this.CHANGE_USER_PHONE_SQL,
            [
                phone,
                phoneVerified,
                isPhoneEnabled,
                verificationCode,
                new Date(),
                userId,
            ]
        )
        const row = res.rows[0];
        return this.rowToContact(row);
    }

    private VERIFY_USER_PHONE_SQL =
        `UPDATE users SET (phone_verified, modified_datetime)
        = ($1, $2)
        WHERE id = $3 AND phone_verification_code = $4
        RETURNING *;`;
    public async verifyPhone(userId: string, verificationCode: string): Promise<Contact> {
        const now = new Date();
        const res = await this.query(
            this.VERIFY_USER_PHONE_SQL,
            [
                now,
                now,
                userId,
                verificationCode,
            ]
        )
        // TODO: Count the rows updated
        const row = res.rows[0];
        return this.rowToContact(row);
    }

    private ENABLE_USER_PHONE_SQL = `
        UPDATE users SET (is_phone_enabled, modified_datetime)
        = ($1, $2)
        WHERE id = $3
        RETURNING *;`;
    public async enablePhone(userId: string, isEnable: boolean): Promise<Contact> {
        const res = await this.query(this.ENABLE_USER_PHONE_SQL, [isEnable, new Date(), userId])
        const row = res.rows[0];
        return this.rowToContact(row);
    }

    private UPDATE_SCHEDULE_SQL = `
        UPDATE users SET (schedule, modified_datetime)
        = ($1, $2)
        WHERE id = $3
        RETURNING *;`;
    public async updateSchedule(schedule: Schedule): Promise<Schedule> {
        const res = await this.query(this.UPDATE_SCHEDULE_SQL, [JSON.stringify(schedule), new Date(), schedule.userId])
        const row = res.rows[0];
        return this.rowToSchedule(row);
    }

    private UPDATE_KEYWORDS_SQL = `
        UPDATE users SET (keywords, modified_datetime)
        = ($1, $2)
        WHERE id = $3
        RETURNING *;`;
    public async updateKeywords(keywords: string[], userId: string): Promise<string[]> {
        const res = await this.query(this.UPDATE_KEYWORDS_SQL, [JSON.stringify(keywords), new Date(), userId])
        const row = res.rows[0];
        return row.keywords;
    }

    private async query(query: string, params: any[]): Promise<any> {
        let res;
        try {
            res = await this.pool.query(query, params);
        } catch (err) {
            if (err instanceof Error) {
                throw new DatabaseError(err as Error);
            }
            throw err;
        }
        return res;
    }

    private rowToUser(row: any): User {
        return new User({
            id: row.id,
            name: row.name,
            contact: this.rowToContact(row),
            schedule: this.rowToSchedule(row),
            keywords: row.keywords,
        });
    }
    private rowToContact(row: any): Contact {
        return new Contact({
            userId: row.id,
            email: row.email,
            emailVerified: row.email_verified,
            isEmailEnabled: row.is_email_enabled,
            phone: row.phone,
            phoneVerified: row.phone_verified,
            isPhoneEnabled: row.is_phone_enabled,
        });
    }

    private rowToSchedule(row: any): Schedule {
        const scheduleData = row.schedule;
        return new Schedule({
            userId: row.id,
            time: new Date(scheduleData.time),
            sunday: scheduleData.sunday,
            monday: scheduleData.monday,
            tuesday: scheduleData.tuesday,
            wednesday: scheduleData.wednesday,
            thursday: scheduleData.thursday,
            friday: scheduleData.friday,
            saturday: scheduleData.saturday,
        });
    }
}
