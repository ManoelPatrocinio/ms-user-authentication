import { NextFunction,Request,Response } from "express";
import { databaseError } from "../models/errors/databaseError.error.model";
import { ForbiddenError } from "../models/errors/forbiddenError.error.model";

function errorHandler(error:any,req:Request, res:Response,next:NextFunction) {
    if (error instanceof databaseError) {
        res.status(400).json({message:"Error in received data"})
    } else if(error instanceof ForbiddenError){
        res.status(403).json({message:"Verifique os dados informados"})

    } else {
        res.status(500).json({message:"Error on server side"})
        
    }
}

export {errorHandler}
