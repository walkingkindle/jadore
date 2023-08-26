/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common/';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  comment: any;
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }
}
