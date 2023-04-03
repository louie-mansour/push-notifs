BEGIN;
    CREATE TABLE IF NOT EXISTS users (
        id varchar(255) PRIMARY KEY,
        email varchar(255) UNIQUE NOT NULL,
        email_verification_code char(7),
        email_verified TIMESTAMP,
        is_email_enabled BOOLEAN,
        phone varchar(50),
        phone_verification_code char(7),
        phone_verified TIMESTAMP,
        is_phone_enabled BOOLEAN,
        schedule JSON NOT NULL,
        keywords JSON NOT NULL,
        login_datetime TIMESTAMP NOT NULL,
        created_datetime TIMESTAMP NOT NULL,
        modified_datetime TIMESTAMP NOT NULL
    );
COMMIT;