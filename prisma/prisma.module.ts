import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import {PrismaClient} from '@prisma/client'


@Module({
    providers:[
        {
            provide:PrismaClient,
            useValue:new PrismaClient()
        },
    ],
    exports:[PrismaClient]
})
export class PrismaModule{}