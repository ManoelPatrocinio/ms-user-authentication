import { Request, Response, NextFunction, response } from "express";
import userRepositories from "../respositories/user.repositories";

class UserController {
  async showAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepositories.findAllUsers();

      if(!users){
        return res.status(404).send({message:"Não foi possivel retornar a lista de usuário"})
      }
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {userEmail,userPassword} =  req.body;
      
      if(!userEmail || !userPassword){
        return res.status(403).send({message:"Credenciais não informadas"});

      }
      const user = await userRepositories.findUserByEmailAndPassword(userEmail,userPassword)
      if(!user){
        return res.status(403).send({message:"Email ou senha incorreta"});
      }
      //send the authenticated user by the request
      req.user = user;

      next()//for send resquest with authenticated user 
      
    } catch (error) {
      next(error)
    }
    
  }

  async loginWithGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const {userEmail,userGoogleId} =  req.body;
      
      if(!userEmail || !userGoogleId){
        return res.status(403).send({message:"Credenciais não informadas"});

      }

      const user = await userRepositories.findUserByEmailAndGoogleId(userEmail,userGoogleId)
      if(!user){
        return res.status(403).send({message:"Essa conta ainda não foi registrada no portal"});
      }
      //send the authenticated user by the request
      req.user = user;

      next()//for send resquest with authenticated user 
      
    } catch (error) {
      next(error)
    }
    
  }



  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    const newUser = req.body;

    if(!newUser.userEmail || !newUser.userName){
      return res.status(403).send({ message: "Preencha todos os campos para realizar o casdastro" });
      //throw new ForbiddenError("Preencha todos os campos para realizar o casdastro");
    } 
    const userEmail = await userRepositories.findUserByEmail(newUser.userEmail);

    if(userEmail){
      //throw new ForbiddenError("Já existe um usuário registrado com esse email");
     return res.status(403).send({ message: "E-mail já registrado,tente outro" });
    }
    try {
      const user = await userRepositories.createUser(newUser);
      res.status(200).send(user);
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

      if (!user) {
        return res.status(404).send({message: "Usuário não encontrado"})
      }
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  async findByEmail(
    req: Request<{ email: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const email = req.params.email;
      const user = await userRepositories.findUserByEmail(email);
      if (!user) {
        return res.status(404).send({message: "Usuário não encontrado"})
      }
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
