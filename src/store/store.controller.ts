import { Request,Controller, Get,Response,Render, Param, Post} from '@nestjs/common';
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

    @Get("/product/:id")
    @Render("product")
    async getSingleProduct(@Param("id") id:string,@Response() res){
        const perfumeData = await this.storeService.getOneProduct(id)
        return {perfumeData}
    }

    @Post("/comment")
    async postNewComment(@Request() req, @Response() res){
        const {name,review,rating,id} = req.body
        const newComment = await this.storeService.addNewComment(name,review,rating)
        console.log("id is",id)
        return res.redirect(`/store/product/${id}`)
    }
}
