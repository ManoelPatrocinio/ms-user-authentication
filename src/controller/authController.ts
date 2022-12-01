import { Request, Response, NextFunction } from "express";
import JWT, { SignOptions } from "jsonwebtoken"
import { ForbiddenError } from "../models/errors/forbiddenError.error.model";
import "dotenv/config"

const secretKey  = process.env.JWT_SECRET_KEY || 'null'



class AuthController{
    async generateToken (req: Request, res: Response, next: NextFunction)  {
  
        try {
            const user = req.user;
      
            if (!user) {
                throw new ForbiddenError('User not informed!');
              }
         
            const jwtPayload = { userEmail: user.userEmail };
            const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '15m' };// token expires In 15 minutes
      
            //create the token
            const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
            const authenticatedUser  = {...user, token: jwt}

            res.status(200).json(authenticatedUser);
        } catch (error) {
            next(error);
        }
      }
}

export {AuthController}