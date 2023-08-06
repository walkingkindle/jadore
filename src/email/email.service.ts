import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv'
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
    private transporter:nodemailer.Transporter

    constructor(){
        this.transporter = nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user: process.env.MAIL_MAIL,
                pass:process.env.MAIL_PASSWORD,
            },
        });
    }

    async sendActivationMail(to:string,activationToken:string):Promise<void>{
        const activationLink = `127.0.0.0:3000/register/activate/${activationToken}`
        this.transporter.sendMail({
            from: process.env.MAIL_MAIL,
            to,
            subject:'Account Activation',
            html:`<p> Click on the following link to activate your account.</p><a href="${activationLink}">${activationLink}</a>`,
        })
    }
}
