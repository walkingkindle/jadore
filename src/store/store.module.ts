import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { PerfumeModule } from 'src/perfume/perfume.module';
import { PerfumeService } from 'src/perfume/perfume.service';

@Module({
  imports:[PerfumeModule],
  providers: [StoreService,PerfumeService],
  controllers: [StoreController],
})
export class StoreModule {}
