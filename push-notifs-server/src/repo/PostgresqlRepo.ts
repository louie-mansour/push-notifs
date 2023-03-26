import { User } from '../domain/User';
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
        return new User({
            id: row.id,
            name: row.name,
            email: row.email,
            phone: row.phone,
            emailVerified: row.emailVerified,
            phoneVerified: row.phoneVerified,
            keywords: row.keywords,
        });
    }
    private READ_USER_SQL = `SELECT * FROM users WHERE id = $1`;

    public async insertUser(user: User): Promise<User> {
        const now = new Date();

        let res;
        try {
            res = await this.pool.query(this.INSERT_USER_SQL, [
                user.id,
                user.email,
                user.emailVerified,
                user.phone,
                user.phoneVerified,
                user.keywords,
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
        return new User({
            id: row.id,
            name: row.name,
            email: row.email,
            phone: row.phone,
            emailVerified: row.emailVerified,
            phoneVerified: row.phoneVerified,
            keywords: row.keywords,
        });
    }
    private INSERT_USER_SQL = `INSERT INTO users (id, email, email_verified, phone, phone_verified, keywords, login_datetime, created_datetime, modified_datetime)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (email) DO
        UPDATE SET login_datetime = EXCLUDED.login_datetime
        RETURNING *;`;

    public async updateUser(user: User): Promise<User> {
        const now = new Date();

        let res;
        try {
            res = await this.pool.query(this.UPSERT_USER_SQL, [
                user.id,
                user.name,
                user.phone,
                user.keywords,
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
        return new User({
            id: row.id,
            name: row.name,
            email: row.email,
            phone: row.phone,
            emailVerified: row.emailVerified,
            phoneVerified: row.phoneVerified,
            keywords: row.keywords,
        });
    }
    private UPSERT_USER_SQL = `INSERT INTO users (id, name, phone, keywords, created_datetime, modified_datetime)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO
        UPDATE SET (name, phone, keywords, modified_datetime)
            = (EXCLUDED.phone, EXCLUDED.keywords, EXCLUDED.modified_datetime)
        RETURNING *;`;
}
