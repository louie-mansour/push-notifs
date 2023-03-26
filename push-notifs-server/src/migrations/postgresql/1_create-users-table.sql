BEGIN;
    CREATE TABLE IF NOT EXISTS users (
        id varchar(255) PRIMARY KEY,
        email varchar(255) UNIQUE NOT NULL,
        email_verified TIMESTAMP,
        phone varchar(50),
        phone_verified TIMESTAMP,
        keywords varchar(100)[] NOT NULL,
        login_datetime TIMESTAMP NOT NULL,
        created_datetime TIMESTAMP NOT NULL,
        modified_datetime TIMESTAMP NOT NULL
    );
COMMIT;