import { Controller, Get,Response,Render } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService:StoreService){}
    @Get('/storemain')
    @Render("store")
   async GetStoreMain(@Response() res){
        const perfumeData = await this.storeService.getAllProducts()
        return {perfumeData}
    }
}
