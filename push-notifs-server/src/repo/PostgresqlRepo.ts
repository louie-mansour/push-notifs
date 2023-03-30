import { Contact, Schedule, User } from '../domain/User';
import { Pool } from 'pg';
import { DatabaseError } from '../error/DatabaseError';
import { NotFoundError } from '../error/NotFoundError';

interface PostgresConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}

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

        let res;
        try {
            res = await this.pool.query(this.LOGIN_UPSERT_USER_SQL, [
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
            ]);
        } catch (err) {
            if (err instanceof Error) {
                throw new DatabaseError(err as Error);
            }
            throw err;
        }

        const row = res.rows[0];
        const userId = row.id
        const contact = new Contact({
            userId: userId,
            email: row.email,
            emailVerified: row.email_verified,
            isEmailEnabled: row.is_email_enabled,
            phone: row.phone,
            phoneVerified: row.phone_verified,
            isPhoneEnabled: row.is_phone_enabled,
        })
        const scheduleData = row.schedule;
        const schedule = new Schedule({
            userId: userId,
            time: scheduleData.time,
            sunday: scheduleData.sunday,
            monday: scheduleData.monday,
            tuesday: scheduleData.tuesday,
            wednesday: scheduleData.wednesday,
            thursday: scheduleData.thursday,
            friday: scheduleData.friday,
            saturday: scheduleData.saturday,
        })
        return new User({
            id: userId,
            name: row.name,
            contact: contact,
            schedule: schedule,
            keywords: row.keywords,
        });
    }


    private READ_USER_SQL = `SELECT * FROM users WHERE id = $1`;
    public async getUser(userId: string): Promise<User> {
        let res;
        try {
            res = await this.pool.query(this.READ_USER_SQL, [userId]);
        } catch (err) {
            if (err instanceof Error) {
                throw new DatabaseError(err as Error);
            }
            throw err;
        }
        if (!res.rows) {
            throw new NotFoundError(`user with Id ${userId} not found`);
        }
        const row = res.rows[0];
        const dbUserId = row.id
        const contact = new Contact({
            userId: dbUserId,
            email: row.email,
            emailVerified: row.email_verified,
            isEmailEnabled: row.is_email_enabled,
            phone: row.phone,
            phoneVerified: row.phone_verified,
            isPhoneEnabled: row.is_phone_enabled,
        })
        const scheduleData = row.schedule;
        const schedule = new Schedule({
            userId: userId,
            time: scheduleData.time,
            sunday: scheduleData.sunday,
            monday: scheduleData.monday,
            tuesday: scheduleData.tuesday,
            wednesday: scheduleData.wednesday,
            thursday: scheduleData.thursday,
            friday: scheduleData.friday,
            saturday: scheduleData.saturday,
        })
        return new User({
            id: dbUserId,
            name: row.name,
            contact: contact,
            schedule: schedule,
            keywords: row.keywords,
        });
    }

    private CHANGE_USER_EMAIL_SQL =
        `UPDATE users SET (email, email_verified, is_email_enabled, modified_datetime)
        = ($1, $2, $3, $4)
        WHERE id = $5
        RETURNING *;`;
    public async changeEmail(contact: Contact): Promise<Contact> {
        const { userId, email, emailVerified, isEmailEnabled } = contact;
        let res;
        try {
            res = await this.pool.query(
                this.CHANGE_USER_EMAIL_SQL,
                [email, emailVerified, isEmailEnabled, new Date(), userId]
            );
        } catch (err) {
            if (err instanceof Error) {
                throw new DatabaseError(err as Error);
            }
            throw err;
        }
        if (!res.rows) {
            throw new NotFoundError(`user with Id ${userId} not found`);
        }
        const row = res.rows[0];
        return new Contact({
            userId: row.id,
            email: row.email,
            emailVerified: row.email_verified,
            isEmailEnabled: row.is_email_enabled,
            phone: row.phone,
            phoneVerified: row.phone_verified,
            isPhoneEnabled: row.is_phone_enabled,
        })
    }

    private ENABLE_USER_EMAIL_SQL = `
        UPDATE users SET (is_email_enabled, modified_datetime)
        = ($1, $2)
        WHERE id = $3
        RETURNING *;`;
    public async enableEmail(userId: string, isEnable: boolean): Promise<Contact> {
        let res;
        try {
            res = await this.pool.query(
                this.ENABLE_USER_EMAIL_SQL,
                [isEnable, new Date(), userId]
            );
        } catch (err) {
            if (err instanceof Error) {
                throw new DatabaseError(err as Error);
            }
            throw err;
        }
        if (!res.rows) {
            throw new NotFoundError(`user with Id ${userId} not found`);
        }
        const row = res.rows[0];
        return new Contact({
            userId: row.id,
            email: row.email,
            emailVerified: row.email_verified,
            isEmailEnabled: row.is_email_enabled,
            phone: row.phone,
            phoneVerified: row.phone_verified,
            isPhoneEnabled: row.is_phone_enabled,
        })
    }

    private CHANGE_USER_PHONE_SQL =
        `UPDATE users SET (phone, phone_verified, is_phone_enabled, modified_datetime)
        = ($1, $2, $3, $4)
        WHERE id = $5
        RETURNING *;`;
    public async changePhone(contact: Contact): Promise<Contact> {
        const { userId, phone, phoneVerified, isPhoneEnabled } = contact;
        let res;
        try {
            res = await this.pool.query(
                this.CHANGE_USER_PHONE_SQL,
                [phone, phoneVerified, isPhoneEnabled, new Date(), userId]
            );
        } catch (err) {
            if (err instanceof Error) {
                throw new DatabaseError(err as Error);
            }
            throw err;
        }
        if (!res.rows) {
            throw new NotFoundError(`user with Id ${userId} not found`);
        }
        const row = res.rows[0];
        return new Contact({
            userId: row.id,
            email: row.email,
            emailVerified: row.email_verified,
            isEmailEnabled: row.is_email_enabled,
            phone: row.phone,
            phoneVerified: row.phone_verified,
            isPhoneEnabled: row.is_phone_enabled,
        })
    }

    private ENABLE_USER_PHONE_SQL = `
        UPDATE users SET (is_phone_enabled, modified_datetime)
        = ($1, $2)
        WHERE id = $3
        RETURNING *;`;
    public async enablePhone(userId: string, isEnable: boolean): Promise<Contact> {
        let res;
        try {
            res = await this.pool.query(
                this.ENABLE_USER_PHONE_SQL,
                [isEnable, new Date(), userId]
            );
        } catch (err) {
            if (err instanceof Error) {
                throw new DatabaseError(err as Error);
            }
            throw err;
        }
        if (!res.rows) {
            throw new NotFoundError(`user with Id ${userId} not found`);
        }
        const row = res.rows[0];
        return new Contact({
            userId: row.id,
            email: row.email,
            emailVerified: row.email_verified,
            isEmailEnabled: row.is_email_enabled,
            phone: row.phone,
            phoneVerified: row.phone_verified,
            isPhoneEnabled: row.is_phone_enabled,
        })
    }

    private UPDATE_SCHEDULE_SQL = `
        UPDATE users SET (schedule, modified_datetime)
        = ($1, $2)
        WHERE id = $3
        RETURNING *;`;
    public async updateSchedule(schedule: Schedule): Promise<Schedule> {
        let res;
        try {
            res = await this.pool.query(
                this.UPDATE_SCHEDULE_SQL,
                [JSON.stringify(schedule), new Date(), schedule.userId]
            );
        } catch (err) {
            if (err instanceof Error) {
                throw new DatabaseError(err as Error);
            }
            throw err;
        }
        if (!res.rows) {
            throw new NotFoundError(`user with Id ${schedule.userId} not found`);
        }
        const row = res.rows[0];
        const scheduleData = row.schedule;
        return new Schedule({
            userId: row.id,
            time: scheduleData.time,
            sunday: scheduleData.sunday,
            monday: scheduleData.monday,
            tuesday: scheduleData.tuesday,
            wednesday: scheduleData.wednesday,
            thursday: scheduleData.thursday,
            friday: scheduleData.friday,
            saturday: scheduleData.saturday,
        })
    }

    private UPDATE_KEYWORDS_SQL = `
        UPDATE users SET (keywords, modified_datetime)
        = ($1, $2)
        WHERE id = $3
        RETURNING *;`;
    public async updateKeywords(keywords: string[], userId: string): Promise<string[]> {
        let res;
        try {
            res = await this.pool.query(
                this.UPDATE_KEYWORDS_SQL,
                [JSON.stringify(keywords), new Date(), userId]
            );
        } catch (err) {
            if (err instanceof Error) {
                throw new DatabaseError(err as Error);
            }
            throw err;
        }
        if (!res.rows) {
            throw new NotFoundError(`user with Id ${userId} not found`);
        }
        const row = res.rows[0];
        return row.keywords;
    }
}
