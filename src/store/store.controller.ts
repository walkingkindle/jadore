/* eslint-disable prettier/prettier */
import {
  Request,
  Controller,
  Get,
  Response,
  Render,
  Param,
  Post,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { PrismaService } from 'prisma/prisma.service';

@Controller('store')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly prisma: PrismaService,
  ) {}
  @Get('/storemain')
  @Render('store')
  async GetStoreMain(@Response() res) {
    const perfumeData = await this.storeService.getAllProducts();
    return { perfumeData };
  }

  @Get('/product/:id')
  @Render('product')
  async getSingleProduct(@Param('id') id: string, @Response() res) {
    console.log('id is ' + id);
    const perfumeData = await this.storeService.getOneProduct(id);
    const comments = await this.storeService.findCommentsByProductId(id)
    return { perfumeData,comments };
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
    return res.redirect(`/store/product/${id}`);
  }
}