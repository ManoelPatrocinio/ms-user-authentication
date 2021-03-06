import { Request, Response, NextFunction } from "express";
import userRepositories from "../respositories/user.repositories";

class UserController {
  async showAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepositories.findAllUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(
    req: Request<{ uui: string }>,
    res: Response,
    next: NextFunction
  ) {
    const newUser = req.body;
    try {
      const uuid = await userRepositories.createUser(newUser);
      res.status(200).send(uuid);
    } catch (error) {
      next(error);
    }
  }

  async findById(
    req: Request<{ uuid: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const uuid = req.params.uuid;
      const user = await userRepositories.findUserById(uuid);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request<{ uuid: string }>,
    res: Response,
    next: NextFunction
  ) {
    const uuid = req.params.uuid;
    const modifieddUser = req.body;
    modifieddUser.uuid = uuid;

    const userAlreadyExist = await userRepositories.findUserById(uuid);

    if (userAlreadyExist) {
      try {
        await userRepositories.UpdateUser(modifieddUser);
        res.status(200).send({ message: "User updated" });
      } catch (error) {
        next(error);
      }
    } else {
      res.status(404).send({ message: "Error user not registed" });
    }
  }
  async deleteUser(
    req: Request<{ uuid: string }>,
    res: Response,
    next: NextFunction
  ) {
    const uuid = req.params.uuid;
    const userAlreadyExist = await userRepositories.findUserById(uuid);

    if (userAlreadyExist) {
      try {
        await userRepositories.deleteUser(uuid);
        res.status(200).send({ message: "User deleted" });
      } catch (error) {
        // res.status(404).send({message: "Error on delete user "})
        next(error);
      }
    } else {
      res.status(404).send({ message: "Error user not registed" });
    }
  }
}

export { UserController };
