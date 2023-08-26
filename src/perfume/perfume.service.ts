/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UnorderedBulkOperation } from 'typeorm';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

export interface PerfumeResponse {
    Id:String,
    Name:String,
    Price:Number,
    Description:String,
    Image:String,
    PriceMultiplier:Number

}
@Injectable()
export class PerfumeService {
  async fetchPerfumes() {
    const config = {
      headers: {
        Authorziation: `Bearer ${API_TOKEN}`,
      },
    };
    try {
      const response = await axios.get(
        'http://127.0.0.1:1337/api/perfumes?populates=true',
        config,
      );
      return response.data
      }catch(error){
        console.error("Error fetching perfumes",error)
        return undefined
    }
}

    async fetchPerfumeById(id:string):Promise<PerfumeResponse>{
        const config = {
            headers:{
                Authorization:`Bearer ${API_TOKEN}`
            },
        }
        try{
            const response = await axios.get(`http://127.0.0.1:1337/api/perfumes/${id}?populate=*`,config);
            const singlePerfume:PerfumeResponse = {
                Id : response.data.data.id,
                Name: response.data.data.attributes.Name,
                Description: response.data.data.attributes.Description,
                Price: response.data.data.attributes.Price,
                Image:response.data.data.attributes.ImageUrl,
                PriceMultiplier:response.data.data.attributes.Pricemultiplier
            }
           return singlePerfume 
        }catch(error){
            console.error('Error fetching perfumes',error)
            return undefined
        }
    }
  }