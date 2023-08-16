/* eslint-disable prettier/prettier */
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from './google.service';
import {UserService} from '../user/user.service'
import { PrismaClient,User,Prisma } from '@prisma/client';
@Controller('google')
export class GoogleController {

    constructor (private readonly googleService:GoogleService,private readonly userService:UserService){
    }


    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req){}


    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req,@Res() res){
       const user = this.googleService.googleLogin(req)
       console.log(user)     
       const existingUser = await this.googleService.findGoogleUserByEmail(user.email)
       if (!existingUser){
        this.googleService.create(user.firstName,user.email,user.lastName,user.accessToken)
       }
       return res.render('index') 
    }
}
