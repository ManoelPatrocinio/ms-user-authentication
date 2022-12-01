import { db } from "../database/db";
import { User } from "../models/user.model";
import "dotenv/config"
import { databaseError } from "../models/errors/databaseError.error.model";

class UsersRepositories{
    async findAllUsers():  Promise<User[]>{
        const query = `SELECT uuid,userName,userEmail, userImgUrl FROM proeja_vivo_users`
        const {rows} = await db.query<User>(query)
        return rows || [];
    }

    async findUserById(uuid:string):  Promise<User>{
        try {
            const query = `SELECT uuid,userName,userEmail,userImgUrl FROM proeja_vivo_users WHERE uuid = $1`
       
            const values = [uuid]
            const {rows} = await db.query<User>(query,values)
           
            return rows[0];
        } catch (error) {
            throw new databaseError("Error on find user by id", error)
        }
       
    }
    async findUserByEmail(email:string):  Promise<User>{
        try {
            const query = `SELECT uuid,userName,userEmail,userImgUrl FROM proeja_vivo_users WHERE userEmail = $1`
       
            const values = [email]
            const {rows} = await db.query<User>(query,values)
           
            return rows[0];
        } catch (error) {
            console.log("bd error: ",error)
            throw new databaseError("Error on find user by userEmail", error)
        }
       
    }
    async createUser(user:User):  Promise<User | null>{
        const query = `
        INSERT INTO proeja_vivo_users(
            userName,
            userEmail,
            userPassword,
            userGoogleId,
            userImgUrl
        ) 
        VALUES($1,$2,crypt($3,$4),$5,$6) 
        RETURNING uuid,userName,userEmail, userGoogleId,userImgUrl`
       
        const values = [user.userName,user.userEmail,user.userPassword,process.env.BD_HASH,user.userGoogleId, user.userImgUrl]
        const {rows} = await db.query<User>(query,values)
        return   !rows[0] ? null : rows[0] ;
    }
    async UpdateUser(user:User):  Promise<void>{
        const query = `
        UPDATE proeja_vivo_users
        SET
            userName  = $1,
            userEmail = $2,
            userPassword = crypt($3, $4) 
        WHERE uuid = $5` 
       
        const values = [user.userName,user.userPassword,process.env.BD_HASH, user.uuid]
        await db.query(query,values) 
    }
    async deleteUser(uuid:string):  Promise<void>{
        const query = `DELETE FROM proeja_vivo_users WHERE uuid = $1`
       
       const values = [uuid]
       await db.query(query,values)
       
    }
    async  findUserByNameAndPassword(userName:string,userPassword:string): Promise<User | null> {
        try {
            
            const query = ` SELECT uuid, userName,userEmail FROM proeja_vivo_users WHERE  userName = $1 AND userPassword = crypt($2, $3)  `
            const values = [userName,userPassword,process.env.BD_HASH]
            const{rows} = await db.query<User>(query,values)
            return !rows[0] ? null : rows[0]
        } catch (error) {
            throw new databaseError("Error on find user by userName and password ", error)
            
        }
    }
    async  findUserByEmailAndPassword(userEmail:string,userPassword:string): Promise<User | null> {
        try {
            
            const query = ` SELECT uuid, userName,userEmail FROM proeja_vivo_users WHERE  userEmail = $1 AND userPassword = crypt($2, $3)  `
            const values = [userEmail,userPassword,process.env.BD_HASH]
            const{rows} = await db.query<User>(query,values)
            return !rows[0] ? null : rows[0]
        } catch (error) {
            throw new databaseError("Error on find user by user Email and password", error)
            
        }
    }
    async  findUserByEmailAndGoogleId(userEmail:string,userGoogleId:string): Promise<User | null> {
        try {
            
            const query = ` SELECT uuid, userName,userEmail, userGoogleId,userImgUrl 
                            FROM proeja_vivo_users
                            WHERE  userEmail = $1 AND userGoogleId = $2 `
                            
            const values = [userEmail,userGoogleId]
            const{rows} = await db.query<User>(query,values)
            return !rows[0] ? null : rows[0]
        } catch (error) {
            throw new databaseError("Error on find user by user Email and user GoogleId", error)
            
        }
    }
    

}

export default new UsersRepositories