/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UnorderedBulkOperation } from 'typeorm';
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const config = {
  headers: {
    Authorziation: `Bearer ${API_TOKEN}`,
  },
};
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


async formatStrapiResponse(response):Promise<PerfumeResponse>{
  const singlePerfume:PerfumeResponse = {
    Id : response.id,
    Name: response.attributes.Name,
    Description: response.attributes.Description,
    Price: response.attributes.Price,
    Image:response.attributes.Image,
    PriceMultiplier:response.attributes.Pricemultiplier
 }
 return singlePerfume
}

    async fetchPerfumeById(id:string):Promise<PerfumeResponse>{
        try{
            const response = await axios.get(`http://127.0.0.1:1337/api/perfumes/${id}?populate=*`,config);
            const singlePerfume = this.formatStrapiResponse(response.data.data)
           return singlePerfume 
        }catch(error){
            console.error('Error fetching perfumes',error)
            return undefined
        }
    }


    async fetchPerfumeByBrand(type: string,query:string): Promise<PerfumeResponse[]> {
      const response = await axios.get(`http://127.0.0.1:1337/api/perfumes?filters[${type}][$eq]=${query}`, config);
      const perfumes = response.data.data;
      
      const formattedPerfumes = await Promise.all(perfumes.map(async (perfume) => {
        return this.formatStrapiResponse(perfume);
      }));
      
      return formattedPerfumes;
    }
    
  }