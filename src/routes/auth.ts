import { Router } from "express";

import baseAuthenticationMiddleware  from "../middlewares/base_authentication.middlware";
import jwtAuthenticationMiddleware from "../middlewares/jwt-auth.middleware";
import "dotenv/config"
import { AuthController } from "../controller/authController";

const authRoute = Router();
const authController = new AuthController()


//router to create token for a existing user
authRoute.post('/token', baseAuthenticationMiddleware,authController.generateToken);

authRoute.post('/token/refresh', jwtAuthenticationMiddleware,authController.generateToken );

export { authRoute };
