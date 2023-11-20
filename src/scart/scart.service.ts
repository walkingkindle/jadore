import { Inject, Injectable } from '@nestjs/common';
import { PerfumeService } from 'src/perfume/perfume.service';
import axios from 'axios';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
export interface PerfumeInCart{
    Name:String
    Price:Number
    MI:Number,
    userId:Number
   }
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const config = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type":"application/json",
    "Accept":"application/json",
  },
};
@Injectable()
export class ScartService {
    constructor(
    @Inject(PerfumeService) private readonly perfumeService:PerfumeService, private readonly prismaService:PrismaService
    ){}
    async addNewProductToCart(id:string,volume:number,userId:number):Promise<any>{
        const perfume = await this.perfumeService.fetchPerfumeById(id)
        console.log(perfume)
        const cartReadyPerfume:PerfumeInCart = {
          Name:perfume.Name,
          Price:perfume.Price,
          MI:volume,
          userId:userId
       }
       console.log(cartReadyPerfume)
       return this.addProductToCartDatabase(cartReadyPerfume)
    }
    

    async addProductToCartDatabase(cartItem:PerfumeInCart){
    try{
      const cart = await this.prismaService.shoppingCart.create({
        data:{
          Name:cartItem.Name.toString(),
          Quantity:Number(cartItem.MI),
          Status:"in-cart",
          Price:Number(cartItem.Price),
          userId:Number(cartItem.userId)
        }
      })
      }catch(PrismaClientUnknownRequestError){
        console.log('Item already in the cart, add another one?')
        return null
      }
      
    }

    async GetShopper(accessToken:String){
        
    }

    async showCart(){
     const cart = this.prismaService.shoppingCart.findMany()
     console.log(cart)
     
    }
}
