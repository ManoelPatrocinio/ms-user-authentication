import { Router} from "express";
import { UserController } from "../controller/userController";

const UserRoutes = Router();
const userController = new UserController()

UserRoutes.get("/users",userController.showAll);

UserRoutes.get("/users/:uuid",userController.findById);

UserRoutes.put("/users/:uuid",userController.update);

UserRoutes.delete("/remove/:uuid",userController.deleteUser);
export { UserRoutes };
