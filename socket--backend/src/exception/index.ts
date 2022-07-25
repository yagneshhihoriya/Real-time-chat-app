import { HttpException, HttpStatus } from "@nestjs/common";

export const AuthExceptions = {
    TokenExpired(): any {
        return new HttpException({ message: "Token Expired use RefreshToken", error: 'TokenExpiredError', statusCode: HttpStatus.FORBIDDEN }, HttpStatus.FORBIDDEN);
    },

    InvalidToken(): any {
        return new HttpException({ message: "Invalid Token", error: 'InvalidToken', statusCode: HttpStatus.FORBIDDEN }, HttpStatus.FORBIDDEN);
    },

    forbiddenException(): any {
        return new HttpException({ message: "This resource is forbidden from this user", error: 'UnAuthorizedResourceError', statusCode: HttpStatus.FORBIDDEN }, HttpStatus.FORBIDDEN);
    },

    InvalidUserId(): any {
        return new HttpException({ message: "Invalid User Id", error: 'InvalidUserId', statusCode: HttpStatus.FORBIDDEN }, HttpStatus.FORBIDDEN);
    },
}

export const TypeExceptions = {
    AlreadyUserExists(): any {
        return new HttpException({ message: "User already exists", error: 'AlreadyUserExists', statusCode: HttpStatus.METHOD_NOT_ALLOWED }, HttpStatus.METHOD_NOT_ALLOWED);
    },
    AlreadyEmailExists(): any {
        return new HttpException({ message: "Email already exists", error: 'AlreadyExists', statusCode: HttpStatus.METHOD_NOT_ALLOWED }, HttpStatus.METHOD_NOT_ALLOWED);
    },
    AlreadyContactExists(): any {
        return new HttpException({ message: "constact already exists", error: 'AlreadyExists', statusCode: HttpStatus.METHOD_NOT_ALLOWED }, HttpStatus.METHOD_NOT_ALLOWED);
    },
    UserNotExists(): any {
        return new HttpException({ message: "User not exists", error: 'DeviceNotExists', statusCode: HttpStatus.METHOD_NOT_ALLOWED }, HttpStatus.METHOD_NOT_ALLOWED);
    },
    UserInsufficient(): any {
        return new HttpException({ message: "Insufficient Data", error: 'Insufficient Data', statusCode: HttpStatus.METHOD_NOT_ALLOWED }, HttpStatus.METHOD_NOT_ALLOWED);
    },

    UserNotFound(): any {
        return new HttpException({ message: "User not found", error: 'UserNotFound', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
    },

    InvalidImageFile(): any {
        return new HttpException({ message: "Uploaded image is invalid", error: 'InvalidImageFile', statusCode: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    },

    GroupEmpty(): any {
        return new HttpException({ message: "Participants not found in the group", error: 'GroupEmpty', statusCode: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    },
    
    InvalidDateRange(): any {
        return new HttpException({ message: "Invalid Date Range", error: 'InvalidDateRange', statusCode: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    },
}
