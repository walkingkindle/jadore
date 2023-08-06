/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { EmailService } from 'src/email/email.service';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient, User } from '@prisma/client';

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
      },
    });

    await this.emailService.sendActivationMail(email, activationToken);
    return user;
  }

  async FindByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
