/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Request, Response, Render, Param, Redirect, Res, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { error } from 'console';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from  '../auth/auth.guard';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService,
        ){}


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
            // res.redirect('/user/register')
            res.render('index')
        } else{
           
            await this.userService.create(name,email,password)
            const stil = "padding: 5rem;";
            const logMessage = "Check your email for confirmation code!";
            res.render('index', {logMessage, stil }) //handle
            // res.redirect('index')
        }
    }
    @Post('/login')
    async login(@Request() req, @Response() res): Promise<void> {
        const { email, password } = req.body;
        const user = await this.userService.FindByEmail(email);
    
        if (user && user.isActivated) {
            const isPasswordValid = await this.userService.verifyPassword(user, password);
    
            if (!isPasswordValid) {
                return res.render('index', { logMessage: "Wrong password. Please try again." });
            }
            
            const payload = { sub: user.id, email: user.email };
            const token = await this.userService.generateToken(payload);
            
            return res.render('index', { token });  
        } else {
            return res.render('index', { logMessage: "User not found" });
        }
    }
    


@UseGuards(AuthGuard)
@Get('profile')
getProfile(@Request() req){
    return req.user
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
@Post("sendActivationMail")
async sendResetPasswordMail(@Request() req, @Response() res):Promise<void>{
    const {email} = req.body;
    this.userService.sendForgotPasswordMail(email)
    return res.render("index") // Display a notification saying your email has been sent or something.
}

@Get("resetPassword/:activationLink/:id")
async resetPasswordPage(@Request() req,@Response() res,@Param('activationLink') activationLink:string,@Param('id') id:number):Promise<void>{
    const isOkay = this.userService.checkActivationLinkAndId(id,activationLink)
    if(!isOkay){
        //display a notification here that link is invalid.
        console.log("link invalid")
    }
    return res.render("resetPass",{id:id})
}
@Post("changeMyPassword/:id")
async changePassword(@Request() req, @Response() res,@Param("id") id:number ):Promise<void>{
    const {password} = req.body
    console.log("Here is the id",id)
    this.userService.changePassword(password,id)
    //Display here a message that that was a sucess.
    return res.render("index")

}
@Post("/logout")
async logout(@Response() res):Promise<void>{
    res.clearCookie('access_token')
    return res.redirect("/")
}
}



  
  
  
  
  
  
  




