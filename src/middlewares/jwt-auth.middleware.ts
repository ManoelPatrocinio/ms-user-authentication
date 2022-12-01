import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { ForbiddenError } from "../models/errors/forbiddenError.error.model";

//send user authenticating by token
async function jwtAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers["authorization"];
    //checks if has params in header
    if (!authorizationHeader) {
      throw new ForbiddenError("Check your crendential");
    }
    //checks the integrity of the token
    const [authenticationType, token] = authorizationHeader.split(" ");
    if (authenticationType !== "Barrer" || !token) {
      throw new ForbiddenError("Check your jwt crendential type");
    }

    try {
      //check if this token is valid 
      const secretKey  = process.env.JWT_SECRET_KEY || 'null'

      const tokenPlayload = JWT.verify(token, secretKey);

      //assure return a string
      if (typeof tokenPlayload !== "object" || !tokenPlayload.sub) {
        throw new ForbiddenError("Token invalid");
      }
      const user = {
        uuid: tokenPlayload.sub,
        userName: tokenPlayload.userName,
        userEmail: tokenPlayload.userEmail,
      };
      //send the authenticated user by the request
      req.user = user;

      next(); //for send resquest with authenticated user
    } catch (error) {
      throw new ForbiddenError("Token invalid");
    }
  } catch (error) {
    next(error);
  }
}

export default jwtAuthenticationMiddleware;
