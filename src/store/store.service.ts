/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PerfumeService } from 'src/perfume/perfume.service';

@Injectable()
export class StoreService {
  constructor(private readonly perfumeService: PerfumeService) {}

  async getAllProducts() {
    const perfumeData = await this.perfumeService.fetchPerfumes();
    const formattedPerfumeData = perfumeData.data.map(
      (item) => item.attributes,
    ); // Extract attributes
    console.log(formattedPerfumeData);
    return formattedPerfumeData;
  }
}

// ctrl + z -> backup
