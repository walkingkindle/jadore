import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { PrismaClient } from '@prisma/client'; 
import { EmailModule } from 'src/email/email.module';
import { AuthModule } from 'src/auth/auth.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'local' }), EmailModule,AuthModule],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, PrismaClient], 
})
export class UserModule {}
