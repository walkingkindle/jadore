/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAIL_MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, activationToken: string): Promise<void> {
    const activationLink = `http://localhost:3000/user/activate/${encodeURIComponent(activationToken)}`;
    this.transporter.sendMail({
      from: process.env.MAIL_MAIL,
      to,
      subject: 'Account Activation',
      // html: `<p style="color: red;"> Click on the following link to activate your account.</p><a href="${activationLink}">${activationLink}</a>`,
      html: `<div style="width: 100%; max-width: 500px; background: linear-gradient(to bottom right, blue, red)"> 
      <p style="color: red;"> Click on the following link to activate your account.</p><a href="${activationLink}">${activationLink}</a>
      </div>`,
    });
  }
}
// sredi ovo urose