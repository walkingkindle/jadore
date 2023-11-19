import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { PerfumeModule } from 'src/perfume/perfume.module';
import { PerfumeService } from 'src/perfume/perfume.service';
import { PrismaService } from 'prisma/prisma.service';
import { ScartService } from 'src/scart/scart.service';
import * as cookieParser from 'cookie-parser'
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports:[PerfumeModule],
  providers: [StoreService,PerfumeService,PrismaService,ScartService],
  controllers: [StoreController],
})
export class StoreModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'addtocart', method: RequestMethod.POST
      })
}
}

