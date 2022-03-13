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
         
            const jwtPayload = { userName: user.username };// funciona assim, pq ? ainda não sei
            const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '15m' };// token expires In 30 minutes
      
            //create the token
            const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
      
            res.status(200).json({  token: jwt });
        } catch (error) {
            next(error);
        }
      }
}

export {AuthController}