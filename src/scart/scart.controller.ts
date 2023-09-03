import { Controller, Get, Render,Request,Response,Post, Body } from '@nestjs/common';
import { ScartService } from './scart.service';

@Controller('scart')
export class ScartController {

    constructor(private readonly scartService:ScartService){}
    @Post("addtocart")
    @Render("product")
    async addProductToCart(@Body() body:{id:string, ml:number}){
        const {id,ml} = body
       this.scartService.addNewProductToCart(id,ml) 
    }
}
