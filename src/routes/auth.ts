import { Router, Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../models/errors/forbiddenError.error.model";
import JWT, { SignOptions } from "jsonwebtoken"
import baseAuthenticationMiddleware  from "../middlewares/base_authentication.middlware";
import jwtAuthenticationMiddleware from "../middlewares/jwt-auth.middleware";
const authRoute = Router();

//router to create token for a existing user

/*
** DESAFIO 
** FAZER UM END-POINTER PARA O REFRESH TOKEN E UMA EXCESSÃO COM ESTATUS CODE 401
**
*/
authRoute.post('/token', baseAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
      const user = req.user;

      if (!user) {
          throw new ForbiddenError('Usuário não informado!');
      }

      const jwtPayload = { username: user.userName };
      const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '15m' };// token expires In 30 minutes
      const secretKey = 'my_secret_key';

      //create the token
      const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

      res.status(200).json({ token: jwt });
  } catch (error) {
      next(error);
  }
});

// router for validate token
authRoute.post('/token/validate', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("token valid");
   
  });

export { authRoute };
