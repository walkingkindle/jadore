/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { PerfumeService, PerfumeResponse } from 'src/perfume/perfume.service';

@Injectable()
export class StoreService {
  constructor(
    private readonly perfumeService: PerfumeService,
    private readonly prisma: PrismaService,
  ) {}

  async getAllProducts() {
    const perfumeData = await this.perfumeService.fetchPerfumes();
    const formattedPerfumeData = perfumeData.data.map((item) => ({
      id: item.id,
      ...item.attributes,
    })); // Extract id and attributes
    return formattedPerfumeData;
  }

  async getOneProduct(id: string): Promise<PerfumeResponse> {
    try {
      const perfume = await this.perfumeService.fetchPerfumeById(id);
      console.log(perfume)
      return perfume;
    } catch (error) {
      console.error('Error parsing perfume', error); //error here
      return null;
    }
  }

  async addNewComment(
    name: string,
    review: string,
    rating: string,
    productId: string,
  ): Promise<any> {
    const realRating = parseInt(rating);
    var date = new Date()
    const DateAdded = date.toLocaleDateString()
    const newComment = await this.prisma.comment.create({
      data: {
        Name: name,
        Review: review,
        Rating: realRating,
        ForProductId:productId,
        Date_Added:DateAdded
      },
    });
    console.log('Sucessfully processed the comment.'); //add notification here.
    return newComment;
  }



  async findCommentsByProductId(id:string){
    const comments = this.prisma.comment.findMany({
      where:{
        ForProductId: id
      }
    })
    return comments
  }
}

// ctrl + z -> backup