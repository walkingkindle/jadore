import { Module } from '@nestjs/common';
import { ScartService } from './scart.service';
import { ScartController } from './scart.controller';
import { PerfumeService } from 'src/perfume/perfume.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [ScartService,PerfumeService,PrismaService],
  controllers: [ScartController]
})
export class ScartModule {}
