import { RequestHandler } from "express";
import { UnauthorizedException } from "../utils/appError";
import { ErrorCodeEnum } from "../enums/error-code.enums";
import { verifyJwtToken } from "../utils/jwt";
import { config } from "../config/app.config";


export const authenticate:RequestHandler =(req,res,next) =>{
    const token = req.cookies._Afteconnet_Token as string | undefined
    if (!token) {
            throw new UnauthorizedException(
              "Le token d'acces est invalide",
               ErrorCodeEnum.AUTH_TOKEN_NOT_FOUND,
            );
          }
    
    const {error, payload} = verifyJwtToken(token,config.JWT_ACCESS_SECRET)
    if(error){
        throw new UnauthorizedException(
            `Ce token d'acces n'est pas valide ou à expiré / ${error}`,
            ErrorCodeEnum.AUTH_INVALID_TOKEN
        )
    }

    req.userId= payload.userId;
    req.userRole = payload.userRole;
    req.sessionId = payload.sessionId;
    req.userPoste = payload.userPoste

    next()
}