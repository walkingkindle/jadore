import { Controller,Get,Post,Request,Response,Render } from '@nestjs/common';
import { UserService } from './user.service';

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

}
