import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { GoogleStrategy } from 'src/google/google.strategy';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [GoogleController],
  providers: [GoogleService,GoogleStrategy,UserService,EmailService,PrismaService]
})
export class GoogleModule {}
