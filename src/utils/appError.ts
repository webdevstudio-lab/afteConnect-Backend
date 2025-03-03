import { HTTPSTATUS, HttpStatusCodeType } from "../config/http.config";
import { ErrorCodeEnum, ErrorCodeEnumType } from "../enums/error-code.enums";

export class AppError extends Error {
    
    public statusCode: HttpStatusCodeType;
    public errorCode?: ErrorCodeEnumType;

    constructor (
        message: string,
        statusCode: HttpStatusCodeType = HTTPSTATUS.INTERNAL_SERVER_ERROR,
        errorCode?: ErrorCodeEnumType
    ){
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode
        Error.captureStackTrace(this, this.constructor);
    }
}

export class HttpException extends AppError {
    constructor(
        message = 'Http Exception Error',
        statusCode: HttpStatusCodeType,
        errorCode?: ErrorCodeEnumType
    ){
        super(message, statusCode, errorCode)
    }
}

export class InternalErrorException extends AppError {
    constructor(
        message = 'Internal Server Error',
        errorCode?: ErrorCodeEnumType
    ) {
        super(
            message,
            HTTPSTATUS.INTERNAL_SERVER_ERROR,
            errorCode || ErrorCodeEnum.INTERNAL_SERVER_ERROR
        )
    }
}

export class NotFoundException extends AppError {
    constructor(
        message = 'La ressource demandée n\'a pas été trouvée',
        errorCode?: ErrorCodeEnumType 
    ){
        super(
            message,
            HTTPSTATUS.NOT_FOUND,
            errorCode || ErrorCodeEnum.RESOURCE_NOT_FOUND
        )
    }
}

export class BadRequestException extends AppError{
    constructor(
        message = 'Bad Request',
        errorCode?: ErrorCodeEnumType
    ){
        super(
            message,
            HTTPSTATUS.BAD_REQUEST,
            errorCode || ErrorCodeEnum.VALIDATION_ERROR
        )
    }
}

export class UnauthorizedException extends AppError{
    constructor(
        message = 'Unauthorized Access',
        errorCode?: ErrorCodeEnumType
    ){
        super(
            message,
            HTTPSTATUS.BAD_REQUEST,
            errorCode || ErrorCodeEnum.ACCESS_UNAUTHORIZED
        )
    }
}