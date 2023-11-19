import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {PrismaModule} from '../prisma/prisma.module'
import { GoogleModule } from './google/google.module';
import { PerfumeModule } from './perfume/perfume.module';
import { StoreModule } from './store/store.module';
import { ScartModule } from './scart/scart.module';
import * as cookieParser from 'cookie-parser'
@Module({

  controllers: [AppController],
  providers: [AppService],
  imports: [
  PrismaModule,
  UserModule,
  GoogleModule,
  PerfumeModule,
  StoreModule,
  ScartModule,
],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes("*")
  }
}
