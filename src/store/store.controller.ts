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
  constructor(private readonly storeService: StoreService, private readonly prisma:PrismaService) {}
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
<<<<<<< HEAD

    return { perfumeData };
=======
    const comments = await this.storeService.findCommentsByProductId(id)
    return { perfumeData,comments };
>>>>>>> 5a0bc17392ab4c0c935088ff1e0d81970aef36ed
  }

  @Post('/comment')
  async postNewComment(@Request() req, @Response() res) {
    const { name, review, rating, id } = req.body;
    const newComment = await this.storeService.addNewComment(
      name,
      review,
      rating,
      id
    );
<<<<<<< HEAD
    const stil = 'padding: 5rem;';
    const logMessage = 'Check your email for confirmation code!';
    console.log('id is', id);
    return res.redirect(`/store/product/${id}`, [logMessage, stil]);
=======
    return res.redirect(`/store/product/${id}`);
>>>>>>> 5a0bc17392ab4c0c935088ff1e0d81970aef36ed
  }
}
