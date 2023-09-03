import { Inject, Injectable } from '@nestjs/common';
import { PerfumeService } from 'src/perfume/perfume.service';
import axios from 'axios';
export interface PerfumeInCart{
    Name:String
    Price:Number
    MI:Number
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
    @Inject(PerfumeService) private readonly perfumeService:PerfumeService
    ){}
    async addNewProductToCart(id:string,ml:number):Promise<any>{
        console.log("id is",id)
        const perfume = await this.perfumeService.fetchPerfumeById(id)
        console.log(perfume)
       const cartReadyPerfume:PerfumeInCart = {
          Name:perfume.Name,
          Price:perfume.Price,
          MI:ml,
       }
       console.log(cartReadyPerfume)

       try{
        const {data,status} = await axios.post<PerfumeInCart>(
            'http://127.0.0.1:1337/api/shoppingcarts',
            {cartReadyPerfume},config
       )
        console.log(status)
        return data


       }catch(error){
        if(axios.isAxiosError(error)){
            console.log('error message:',error.message)
            return error.message
        }else{
            console.log("Unexpected Error",error)
            return "An unexpected error occurred"
        }
       }
        
    }
}
