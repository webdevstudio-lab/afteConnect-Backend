import { NextFunction, Request, Response } from "express";

type AcyncControllerType = (
    req:Request,
    res:Response,
    next:NextFunction
) => Promise<any>


export const  asyncHandler = (controller : AcyncControllerType): AcyncControllerType =>
    async(req , res , next) => {
        try {
            await controller(req , res , next)
        } catch (error) {
            next(error)
        }
    }