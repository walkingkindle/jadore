import { Module } from '@nestjs/common';
import { ScartService } from './scart.service';
import { ScartController } from './scart.controller';
import { PerfumeService } from 'src/perfume/perfume.service';

@Module({
  providers: [ScartService,PerfumeService],
  controllers: [ScartController]
})
export class ScartModule {}
