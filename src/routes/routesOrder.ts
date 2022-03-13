import { Router} from "express";
import { UserController } from "../controller/userController";

const routes = Router();
const userController = new UserController()

routes.get("/users",userController.showAll);

routes.get("/users/:uuid",userController.findById );

routes.post("/users",userController.createUser);

routes.put("/users/:uuid",userController.update );

routes.delete("/users/:uuid",userController.deleteUser );
export { routes };
