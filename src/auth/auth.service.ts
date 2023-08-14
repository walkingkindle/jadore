import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt'
@Injectable()
export class AuthService {
    constructor(private userService:UserService,private jwtService:JwtService){}

    async signIn(email:string,password:string):Promise<any>{
        const user = await this.userService.FindByEmail(email)
        if(user && user.isActivated){
            const isPasswordValid = await this.userService.verifyPassword(user,password)
            if(!isPasswordValid){
                // failure
               const logMessage = "Wrong password. Please try again.";
            }else{
                // success
                const stil = "padding: 5rem;";
                const payload = {sub:user.id,email:user.AuthToken}
                const logMessage = "Welcome back!";


                return {
                    access_token: await this.jwtService.signAsync(payload),
                } 
            }
        }
    }
}