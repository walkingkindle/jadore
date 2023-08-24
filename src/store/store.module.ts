import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { PerfumeModule } from 'src/perfume/perfume.module';
import { PerfumeService } from 'src/perfume/perfume.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports:[PerfumeModule],
  providers: [StoreService,PerfumeService,PrismaService],
  controllers: [StoreController],
})
export class StoreModule {}
