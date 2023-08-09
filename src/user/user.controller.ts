/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Request, Response, Render, Param, Redirect, Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { error } from 'console';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get('/sign-up')
    @Render('sign-up')
    getSignUp() {
      let data = {
        title: 'Sign-up',
      };
      return data;
    }

    @Post('register')
    async register(
        @Request() req,
        @Response() res,

    ):Promise<void>{
        const { name, email,password} = req.body
        const user = await this.userService.FindByEmail(email)
        if(user){
            res.redirect('/user/register')
        } else{
           
            await this.userService.create(name,email,password)
            res.redirect('/')
        }
    }
    
    @Post('/login')
    async login(
        @Request() req,
        @Response() res,
    ):Promise<void>{
        const {email,password} = req.body
        const user = await this.userService.FindByEmail(email)
        if(user && user.isActivated){
            const isPasswordValid = await this.userService.verifyPassword(user,password)
            if(!isPasswordValid){
                // failure
               const logMessage = "Wrong password. Please try again.";
               res.render('index', {logMessage }) //handle
            }else{
                // success
                const stil = "padding: 5rem;";
                const logMessage = "Welcome back!";
                res.render('index', {logMessage, stil }) //handle
            }

        }else{
            //Couldn't find you
            const logMessage  = "User not found";
            res.render('index', {logMessage }) //handle

        }
    }


// 
@Get('/activate/:activationToken')
async activate(@Param('activationToken') activationToken: string, @Response() res): Promise<void> {
  try {
    const isActivated = await this.userService.activateAccount(activationToken);
    console.log(isActivated)
    res.redirect('/user/activated/true'); // Updated redirection
  } catch {
    console.log(error);
    res.redirect("/user/activated/false"); // Updated redirection
  }
}


@Get('/activated/:activated')
async handleActivated(@Param('activated') activated: string, @Response() res): Promise<void> {
    let logMessage = '';
    let stil = '';
    
    if (activated === 'true') {
        logMessage = 'Account activated successfully!';
        stil = 'padding: 5rem;';
    } else if (activated === 'false') {
        logMessage = 'Failed to activate account.';
    } else {
        logMessage = 'Invalid activation request.';
    }

    res.render('index', { logMessage, stil });
}
}



  
  
  
  
  
  
  




