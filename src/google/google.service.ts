/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {PrismaClient, User, Prisma} from '@prisma/client';

@Injectable()
export class GoogleService {
    

    constructor(private readonly prisma:PrismaService){}
    googleLogin(req){
        if(!req.user){
            return 'No user from google'
        }

        return req.user
    }
    

    async findGoogleUserByEmail(email:string):Promise<boolean>{
        const googleUser = await this.prisma.googleUser.findUnique({
            where:{
                email:email
            },
        })
        return googleUser? true:false
    }



    async create(firstName:string,email:string,lastName:string,authToken:string):Promise<any>{
        const googleUser = await this.prisma.googleUser.create({
            data:{
                email:email,
                firstName:firstName,
                lastName:lastName,
                accessToken:authToken

            },
        })

        return googleUser
    }
    

}
