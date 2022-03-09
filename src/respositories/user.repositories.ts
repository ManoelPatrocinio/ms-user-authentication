import { db } from "../database/db";
import { User } from "../models/user.model";
import "dotenv/config"
import { databaseError } from "../models/errors/databaseError.error.model";

class UsersRepositories{
    async findAllUsers():  Promise<User[]>{
        const query = `SELECT uuid,userName FROM application_user`
        const {rows} = await db.query<User>(query)
        return rows || [];
    }

    async findUserById(uuid:string):  Promise<User>{
        try {
            const query = `SELECT uuid,userName FROM application_user WHERE uuid = $1`
       
            const values = [uuid]
            const {rows} = await db.query<User>(query,values)
           
            return rows[0];
        } catch (error) {
            throw new databaseError("Error on find user by id", error)
        }
       
    }
    async createUser(user:User):  Promise<string>{
        const query = `
        INSERT INTO application_user(
            userName,
            userPassword
        ) 
        VALUES($1, crypt($2,$3)) 
        RETURNING uuid`
       
        const values = [user.userName,user.userPassword,process.env.BD_HASH_CRYPT]
        const {rows} = await db.query<{uuid:string}>(query,values)
        return rows[0].uuid ;
    }
    async UpdateUser(user:User):  Promise<void>{
        const query = `
        UPDATE application_user
        SET
            userName  = $1,
            userPassword = crypt($2, $3) 
        WHERE uuid = $4` 
       
        const values = [user.userName,user.userPassword,process.env.BD_HASH_CRYPT, user.uuid]
        await db.query(query,values) 
    }
    async deleteUser(uuid:string):  Promise<void>{
        const query = `DELETE FROM application_user WHERE uuid = $1`
       
       const values = [uuid]
       await db.query(query,values)
       
    }
    async  findUserByNameAndPassword(userName:string,userPassword:string): Promise<User | null> {
        try {
            
            const query = ` SELECT uuid, userName FROM application_user WHERE  userName = $1 AND userPassword = crypt($2, $3)  `
            const values = [userName,userPassword,process.env.BD_HASH_CRYPT]
            const{rows} = await db.query<User>(query,values)
            return !rows[0] ? null : rows[0]
        } catch (error) {
            throw new databaseError("Error on find user by userName and password", error)
            
        }
    }

}

export default new UsersRepositories