import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {PrismaModule} from '../prisma/prisma.module'
import { GoogleModule } from './google/google.module';

@Module({

  controllers: [AppController],
  providers: [AppService],
  imports: [
  PrismaModule,
  UserModule,
  GoogleModule,
],
})
export class AppModule {}
