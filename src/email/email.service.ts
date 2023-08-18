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
    const activationLink = `http://localhost:3000/user/activate/${encodeURIComponent(
      activationToken,
    )}`;
    const backgroundImage =
      'https://scontent.xx.fbcdn.net/v/t1.15752-9/363873162_1788779228241965_7958525108006894893_n.png?stp=dst-png_p206x206&_nc_cat=109&ccb=1-7&_nc_sid=aee45a&_nc_ohc=Oatee0_4dEsAX9jCInQ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQqjYgO8zYb6qtpK7HBrX3C9pjjsoCc0u0mGrTvsdmp0A&oe=64F97221';
    this.transporter.sendMail({
      from: process.env.MAIL_MAIL,
      to,
      subject: 'Account Activation',
      // html: `<p style="color: red;"> Click on the following link to activate your account.</p><a href="${activationLink}">${activationLink}</a>`,

      html: `
  <div style="width:100%; background-color:lightgray;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td style="padding: 20px;">
        <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; background-color: transparent; padding: 20px; border-radius: 10px; background-image: url('${backgroundImage}'); background-size: cover;">
          <h2 style="color: #D4B28C;">Hello user,</h2>
          <p style="color: #D4B28C;  font-size: 15px;">You've just finished the registration process on Jadore. To validate your registration, you need to confirm your email address by clicking the button below.</p>
          <p style="text-align: center;color: #D4B28C;  font-size: 15px;">
            <a href="${activationLink}" style=" background-color: #d4b28c; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Activate Your Account</a>
          </p>
          <p style="color: #D4B28C;  font-size: 15px;">If the account activation button cannot be clicked or interacted with, please enter the link by copying and pasting it directly into the address bar.</p>
          <p style="text-align: center;background-color: #d4b28c;padding: 10px;color: #fff !important;  font-size: 15px;">
           <a href="${activationLink}" style="color:#fff">${activationLink}</a>
          </p>
          <p style="color: #D4B28C;  font-size: 15px;">Thank you,<br>Jadore Team</p>
        </div>
      </td>
    </tr>
  </table>
  </div>
      `,
    });
  }

  async sendForgotPasswordMail(
    resetToken: string,
    userId: number,
    email: string,
  ): Promise<boolean> {
    const resetPasswordLink = `http://localhost:3000/user/resetPassword/${resetToken}/${userId}`;
    try {
      const backgroundImage =
        'https://scontent.xx.fbcdn.net/v/t1.15752-9/363873162_1788779228241965_7958525108006894893_n.png?stp=dst-png_p206x206&_nc_cat=109&ccb=1-7&_nc_sid=aee45a&_nc_ohc=Oatee0_4dEsAX9jCInQ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQqjYgO8zYb6qtpK7HBrX3C9pjjsoCc0u0mGrTvsdmp0A&oe=64F97221';
      this.transporter.sendMail({
        from: process.env.MAIL_MAIL,
        to: email,
        subject: 'Account Reset',
        // html:`<p>Please reset your password with the following link<a href="${resetPasswordLink}">Link<a/></p>"`
        html: `
          <div style="width:100%; background-color:lightgray;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding: 20px;">
                <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; background-color: transparent; padding: 20px; border-radius: 10px; background-image: url('${backgroundImage}'); background-size: cover;">
                  <h2 style="color: #D4B28C;">Hello user,</h2>
                  <p style="color: #D4B28C;  font-size: 15px;">You've just initiated the password reset process on Jadore. To reset your password clicking the button below.</p>
                  <p style="text-align: center;color: #D4B28C;  font-size: 15px;">
                    <a href="${resetPasswordLink}" style=" background-color: #d4b28c; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Reset Your Account</a>
                  </p>
                  <p style="color: #D4B28C;  font-size: 15px;">If the password reset button cannot be clicked or interacted with, please enter the link by copying and pasting it directly into the address bar.</p>
                  <p style="text-align: center;background-color: #d4b28c;padding: 10px; color: #fff !important;  font-size: 15px;">
                  <a href="${resetPasswordLink}" style="color:#fff">${resetPasswordLink}</a>
                  </p>
                  <p style="color: #D4B28C;  font-size: 15px;">Thank you,<br>Jadore Team</p>
                </div>
              </td>
            </tr>
          </table>
          </div>
              `,
      });
      return true;
    } catch (error) {
      console.log('Error sending mail', error);
      return false;
    }
  }
}
// sredi ovo urose
