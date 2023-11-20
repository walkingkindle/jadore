import { Controller, Get, Render,Request,Response,Post, Body } from '@nestjs/common';
import { ScartService } from './scart.service';

@Controller('/scart')
export class ScartController {
    constructor(private readonly scartService:ScartService){}

@Get('/showcart')
async showCart(@Request() req, @Response() res){
        this.scartService.showCart()
}
}