import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/appError";
import { ErrorCodeEnum } from "../enums/error-code.enums";

export const authorization = (role: any) => (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.userRole 
    if(!userRole || !userRole.includes(role)) {
         throw new UnauthorizedException(
            "Vous n'avez pas les droits requis pour éxecuter cette action", 
            ErrorCodeEnum.ACCESS_UNAUTHORIZED)
    }
    next()
}

export const accessRoute = (poste : any ) => (req: Request, res: Response, next: NextFunction) => {
    const userPoste = req.userPoste
    if(!userPoste || !userPoste.includes(poste)) {
        throw new UnauthorizedException(
           "Vous n'avez pas les droits requis pour acceder à cette page", 
           ErrorCodeEnum.ACCESS_UNAUTHORIZED)
   }
   next()
}