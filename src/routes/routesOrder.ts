import { Router, Request , Response, NextFunction } from "express";
import { User } from "../models/user.model";
import userRepositories from "../respositories/user.repositories";

const routes = Router();


routes.get("/users", async (req:Request, res:Response,next:NextFunction) => {
  try {
    const users = await userRepositories.findAllUsers()
    res.status(200).send(users)
    
  } catch (error) {
    res.status(404).send({message: "Error from return users list"})
    
  }
});

routes.get("/users/:uuid", async (req:Request<{uuid: string}>, res:Response,next:NextFunction) => {
  const uuid = req.params.uuid
  try {
    const user = await userRepositories.findUserById(uuid)
    res.status(200).send(user)
  } catch (error) {
    res.status(404).send({message: "Error on find user "})
  }
});

routes.post("/users", async (req:Request<{uui: string}>, res:Response,next:NextFunction) => {
  const newUser = req.body 
  try {
    const uuid = await userRepositories.createUser(newUser)
    res.status(200).send(uuid)
  } catch (error) {
    res.status(404).send({message: "Error on create new user"}) 
  }
});

routes.put("/users/:uuid", async (req:Request<{uuid: string}>, res:Response,next:NextFunction) => {
  const uuid = req.params.uuid
  const modifieddUser = req.body
  modifieddUser.uuid = uuid

  const userAlreadyExist = await userRepositories.findUserById(uuid)

  if(userAlreadyExist){
    try {
       await userRepositories.UpdateUser(modifieddUser)
      res.status(200).send({message: "User updated"})
    } catch (error) {
      res.status(404).send({message: "Error on update user "})
    }
  }else{
    res.status(404).send({message: "Error user not registed"})

  }
 
});

routes.delete("/users/:uuid", async (req:Request<{uuid: string}>, res:Response,next:NextFunction) => {
  const uuid = req.params.uuid
  const userAlreadyExist = await userRepositories.findUserById(uuid)

  if(userAlreadyExist){
    try {
       await userRepositories.deleteUser(uuid)
      res.status(200).send({message: "User deleted"})
    } catch (error) {
      res.status(404).send({message: "Error on delete user "})
    }
  }else{
    res.status(404).send({message: "Error user not registed"})

  }
});
export { routes };
