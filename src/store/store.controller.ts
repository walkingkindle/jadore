/* eslint-disable prettier/prettier */
import {
  Request,
  Controller,
  Get,
  Response,
  Render,
  Param,
  Post,
  Res,
  Body,
  Redirect,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { PrismaService } from 'prisma/prisma.service';
import { ScartService } from 'src/scart/scart.service';

@Controller('store')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly prisma: PrismaService,
    private readonly scart: ScartService
  ) {}

  @Get('/storemain')
  @Render('store')
  async GetStoreMain(@Response() res) {
    const perfumeData = await this.storeService.getAllProducts();
    console.log(perfumeData)
    return { perfumeData };
  }

  @Get("/brand/:brand")
  @Render("store")
  async getStoreFilter(@Response() res, @Param("brand") brand:string){
    const perfumeData = await this.storeService.getProductsByBrand('Brand',brand)
    if (!perfumeData){
      return res.redirect("/")
    }
    return {perfumeData}
  }
  @Get("/aroma/:aroma")
  @Render("store")
  async getStoreFilterAroma(@Response() res, @Param("aroma") aroma:string){
    const perfumeData = await this.storeService.getProductsByBrand('Aroma',aroma)
    if(!perfumeData){
      return res.redirect("/")
    }
    return {perfumeData}
  }


  @Get("/quantity/:number")
  @Render("store")
  async getStoreFilterQuantity(@Response() res, @Param("number") number:string){
    const perfumeData = await this.storeService.getProductsByBrand("Quantity",number)
    if(!perfumeData){
      return res.redirect("/")
    }
    return {perfumeData}
  }

  @Get('/product/:id')
  @Render('product')
  async getSingleProduct(@Param('id') id: string, @Response() res) {
    const perfumeData = await this.storeService.getOneProduct(id);
    const comments = await this.storeService.findCommentsByProductId(id);
    return { perfumeData, comments };
  }


  @Post("/filter")
  @Render("store")
  async filterPerfumes(@Request() req, @Response() res,@Body('brand')selectedBrands:string[],@Body('aroma') selectedAromas:string[], @Body('quantity') selectedQuantity:string[]){
    const perfumeData = await this.storeService.getProductsByFilters(selectedAromas,selectedBrands,selectedQuantity)

    return {perfumeData}
    
  }

  @Post('/comment')
  async postNewComment(@Request() req, @Response() res) {
    const { name, review, rating, id } = req.body;
    const newComment = await this.storeService.addNewComment(
      name,
      review,
      rating,
      id,
    );

    const someVariable = 'Your review was submitted successfully!';
    const padding = '5rem';
    res.redirect(`/store/product/${id}?var=${someVariable}&padding=${padding}`);
  }

  @Post("addtocart")
  async addProductToCart(@Body() body: { id: string, volume: number,userid:number }, @Response() res, @Request() req) {
      const { id, volume } = body;
      const accessToken = req.cookies.access_token
      const userid = req.cookies.userId
      console.log(userid) 
      // Your logic to add to the cart
      this.scart.addNewProductToCart(id, volume,userid);
      return res.render('cart')
  }
  
}
