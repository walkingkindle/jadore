/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { EmailService } from 'src/email/email.service';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient, User,Prisma } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/google/google.strategy';

@Injectable()
export class UserService {
  private prisma: PrismaClient;

  
  constructor(private readonly emailService: EmailService, private readonly jwtService:JwtService) {
    this.prisma = new PrismaClient();
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const activationToken = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
        AuthToken: activationToken,
        isActivated:false,
      },
    });

    await this.emailService.sendActivationMail(email, activationToken);
    return user;
  }

  
 async activateAccount(activationToken: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        AuthToken: activationToken,
      },
    });

  
    if (!user) {
      throw new NotFoundException('Invalid activation token');
    }

    await this.prisma.user.updateMany({
      where: {
        id: user.id,
      },
      data: {
        isActivated: true,
      },
    });

    return user.isActivated

    };
   

  async generateToken(payload: {sub:number,email:string}): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  

  async FindByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async verifyPassword(user:User,password:string):Promise<boolean>{
    return bcrypt.compare(password,user.password)
  }

  async sendForgotPasswordMail(userEmail:string):Promise<boolean>{
    const user = await this.prisma.user.findFirst({
      where:{
        email:userEmail,
      },
    })
    if(!user){
      console.log("Couldn't find you.")
      return false
    }
    try{
      const resetToken = (await user).AuthToken
      const id = (await user).id
      this.emailService.sendForgotPasswordMail(resetToken,id,userEmail)
      return true
    }catch(error){
      console.error("Error sending mail",error)
      return false
    }
  }

  async checkActivationLinkAndId(id:number,activationLink:string):Promise<boolean>{
    var realId: number = +id
    const user = await this.prisma.user.findFirst({
      where:{
        id:realId,
      },
    })
    if(!user){
      return false
    }
    return (await user).AuthToken === activationLink
    
  }


  async changePassword(newPassword:string,id:number):Promise<boolean>{
    var realId = +id;
    const user = await this.prisma.user.findFirst({
      where:{
        id:realId,
      },
    })
    if(!user){
      console.log("couldn't find user")
      return false
    }
    try{
      const newHashedPassword = await bcrypt.hash(newPassword,10)
      await this.prisma.user.updateMany({
        where:{
          id:realId
        },
        data:{
          password:newHashedPassword
        }
      })
      return true
    }catch(error){
      console.log("Error changing password",error)
      return false
    }
  }


}
