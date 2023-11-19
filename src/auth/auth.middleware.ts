import { Injectable,NestMiddleware } from "@nestjs/common";
import { error } from "console";
import { NextFunction,Request,Response } from "express";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    use(req:Request, res:Response,next:NextFunction){
        const token = req.cookies.access_token

        if(token){
            try{
                const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
                req['user'] = decodedToken;

            }catch{
                console.error(error)
            }
        }
        next()
    }
}