import { Router} from "express";
import { UserController } from "../controller/userController";
import { AuthController } from "../controller/authController";

const basicRoutes = Router();
const userController = new UserController()
const authController = new AuthController()


basicRoutes.post("/register",userController.createUser);
basicRoutes.post('/login',userController.login ,authController.generateToken)
basicRoutes.post('/loginWithGoogle',userController.loginWithGoogle ,authController.generateToken)

export { basicRoutes };
