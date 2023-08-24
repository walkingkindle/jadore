/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PerfumeService,PerfumeResponse } from 'src/perfume/perfume.service';

@Injectable()
export class StoreService {
  constructor(private readonly perfumeService: PerfumeService) {}

  async getAllProducts() {
    const perfumeData = await this.perfumeService.fetchPerfumes();
    const formattedPerfumeData = perfumeData.data.map((item) => ({
      id: item.id,
      ...item.attributes,
    })); // Extract id and attributes
    return formattedPerfumeData;
  }

  async getOneProduct(id:string):Promise<PerfumeResponse>{
    try{
    const perfume = await this.perfumeService.fetchPerfumeById(id)
    console.log(perfume)
    return perfume
    }catch(error){
      console.error("Error parsing perfume",error) //error here
      return null
    }
  }
}

// ctrl + z -> backup
