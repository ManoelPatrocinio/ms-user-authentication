CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
CREATE EXTENSION IF NOT EXISTS "pgcrypto"
CREATE TABLE IF NOT EXISTS  application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    userName VARCHAR NOT NULL,
    userPassword VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
) 

INSERT INTO application_user (userName,userPassword) VALUES('masterAdmin', crypt('masterAdmin','5A31E10EA068FF0FEC7BFD9BC6CBDDBF'))