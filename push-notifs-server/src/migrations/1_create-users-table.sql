BEGIN;
    CREATE TABLE IF NOT EXISTS users (
        id varchar(255) PRIMARY KEY,
        email varchar(255) UNIQUE NOT NULL,
        phone varchar(50),
        keywords varchar(50)[] NOT NULL,
        created_datetime TIMESTAMP NOT NULL,
        modified_datetime TIMESTAMP NOT NULL
    );
COMMIT;