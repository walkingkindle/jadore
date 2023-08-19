import { Controller, Post, Request,Response } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService:EmailService){}
    @Post('sendmail')
    async sendMail(@Request() req, @Response() res):Promise<void>{
        const {name,email,query} = req.body;
        this.emailService.sendContactMail(name,email,query)
        console.log('Notification that the email has been sent to us')  //Notification here.
        res.render("index")
    }
}
