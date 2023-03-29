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
    public async readUser(userId: string): Promise<User> {
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
            phone: row.phone,
            emailVerified: row.email_verified,
            phoneVerified: row.phone_verified,
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
}
