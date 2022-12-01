CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
CREATE EXTENSION IF NOT EXISTS "pgcrypto"
CREATE TABLE IF NOT EXISTS  proeja_vivo_users(
    uuid uuid DEFAULT uuid_generate_v4(),
    userName VARCHAR NOT NULL,
    userEmail VARCHAR NOT NULL,
    userPassword VARCHAR NOT NULL,
    userGoogleId VARCHAR NOT NULL,
    userImgUrl VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
) 

INSERT INTO proeja_vivo_users (userName,userEmail,userPassword,userGoogleId,userImgUrl) VALUES('masterAdmin','manoelpatrocinio99@gmail.com',crypt('masterAdmin','5A31E10EA068FF0FEC7BFD9BC6CBDDBF',"",""))