import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local'
import { UserService } from "./user.service";
import * as bcrypt from 'bcryptjs'


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private readonly userService:UserService){
    super()
}

   async validate(email:string,password:string):Promise<any>{
    const user = await this.userService.FindByEmail(email)
    if(!user){
        throw new UnauthorizedException('Invalid credentials')
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        throw new UnauthorizedException('Invalid Credentials')
    }

    return user;
   }
}