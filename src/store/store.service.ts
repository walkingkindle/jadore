/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, User } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'prisma/prisma.service';
import { PerfumeService, PerfumeResponse } from 'src/perfume/perfume.service';

const authToken = process.env.STRAPI_API_TOKEN;
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
      console.log(perfume);
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
    var date = new Date();
    const DateAdded = date.toLocaleDateString();
    const newComment = await this.prisma.comment.create({
      data: {
        Name: name,
        Review: review,
        Rating: realRating,
        ForProductId: productId,
        Date_Added: DateAdded,
      },
    });
    console.log('Sucessfully processed the comment.'); //add notification here.
    return newComment;
  }

  async findCommentsByProductId(id: string) {
    const comments = this.prisma.comment.findMany({
      where: {
        ForProductId: id,
      },
    });
    return comments;
  }

  async getProductsByBrand(type: string, brand: string) {
    const perfumes = await this.perfumeService.fetchPerfumeByBrand(type, brand);
    return perfumes;
  }

  async getProductsByFilters(
    selectedAromas: string[],
    selectedBrands: string[],
    selectedQuantity: string[],
  ): Promise<PerfumeResponse[]> {
    let api_call = 'http://127.0.0.1:1337/api/perfumes?filters';
    if (selectedBrands) {
      for (let i = 0; i < selectedBrands.length; i++) {
        if (selectedBrands.length > 0) {
          api_call += `[Brand][$eq]=${selectedBrands[i]}`;
        }
      }
      console.log(api_call);
    }
    if (
      (selectedBrands && selectedAromas) ||
      (selectedQuantity && selectedAromas)
    ) {
      for (let j = 0; j < selectedAromas.length; j++) {
        if (selectedAromas.length > 0) {
          api_call += `&filters[Aroma][$eq]=${selectedAromas[j]}`;
        }
      }
      console.log('api key at the second step');
    } else if (selectedAromas) {
      for (let i = 0; i < selectedAromas.length; i++) {
        if (selectedAromas.length > 0) {
          api_call += `[Aroma][$eq]=${selectedAromas[i]}`;
        }
      }
    }
    if (
      (selectedBrands && selectedQuantity) ||
      (selectedBrands && selectedQuantity)
    ) {
      for (let k = 0; k < selectedQuantity.length; k++) {
        if (selectedQuantity.length > 0) {
          api_call += `&filters[Quantity][$eq]=${selectedQuantity[k]}`;
        }
      }
    } else if (selectedQuantity) {
      for (let i = 0; i < selectedQuantity.length; i++) {
        if (selectedQuantity.length > 0) {
          api_call += `[Quantity][$eq]=${selectedQuantity[i]}`;
        }
      }
    }
    console.log('final api call', api_call);

    const perfumes = await this.perfumeService.fetchWithApiCall(api_call);

    return perfumes;
  }
}

// ctrl + z -> backup
