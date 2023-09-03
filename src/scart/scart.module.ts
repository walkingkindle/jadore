import { Module } from '@nestjs/common';
import { ScartService } from './scart.service';
import { ScartController } from './scart.controller';

@Module({
  providers: [ScartService],
  controllers: [ScartController]
})
export class ScartModule {}
