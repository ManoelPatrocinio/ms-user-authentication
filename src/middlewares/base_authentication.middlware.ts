import { NextFunction,Request,Response } from "express";
import { databaseError } from "../models/errors/databaseError.error.model";
import { ForbiddenError } from "../models/errors/forbiddenError.error.model";
import userRepositories from "../respositories/user.repositories";

async function baseAuthenticationMiddleware (req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers["authorization"];
        //checks if has params in header
        if (!authorizationHeader) {
          throw new ForbiddenError("Check your crendential");
        }
        //checks the integrity of the token
        const [authenticationType, token] = authorizationHeader.split(" ");
        if (authenticationType !== "Basic" || !token) {
          throw new ForbiddenError("Check your crendential type");
        }
        //converte token for strint 
        const tokenContent = Buffer.from(token,'base64').toString('utf-8')
        
        const[userName,userPassword] = tokenContent.split(':')
  
        if(!userName || !userPassword){
          throw new ForbiddenError("empty crendential ");
        }
        const user = await userRepositories.findUserByNameAndPassword(userName,userPassword)
        if(!user){
          throw new ForbiddenError("invalid user or password ");
        }
        //send the authenticated user by the request
        req.user = user;

        next()//for send resquest with authenticated user 
        
    } catch (error) {
        next(error)
    }
}

export default baseAuthenticationMiddleware
