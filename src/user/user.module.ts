import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import * as session from 'express-session';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'local' }), EmailModule],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, PrismaClient], 
})
export class UserModule {}
