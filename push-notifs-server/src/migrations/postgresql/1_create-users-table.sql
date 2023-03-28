BEGIN;
    CREATE TABLE IF NOT EXISTS users (
        id varchar(255) PRIMARY KEY,
        email varchar(255) UNIQUE NOT NULL,
        email_verified TIMESTAMP,
        email_notifications_enabled BOOLEAN,
        phone varchar(50),
        phone_verified TIMESTAMP,
        phone_notifications_enabled BOOLEAN,
        notification_schedule JSON NOT NULL,
        keywords JSON NOT NULL,
        login_datetime TIMESTAMP NOT NULL,
        created_datetime TIMESTAMP NOT NULL,
        modified_datetime TIMESTAMP NOT NULL
    );
COMMIT;