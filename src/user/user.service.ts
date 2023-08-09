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

@Injectable()
export class UserService {
  private prisma: PrismaClient;

  constructor(private readonly emailService: EmailService) {
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
}
