import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";

export const errorHandler: ErrorRequestHandler = (
    error,
    req,
    res,
    next):any => {
       
        if(error instanceof SyntaxError) {
            return res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "Invalid JSON format , please check your request"
            });
        }

        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                errorCode: error.errorCode
            })
        }

        
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
            error: error?.message || "Unknown error occurred",
        })
    }