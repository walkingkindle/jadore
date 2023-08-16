/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { PerfumeService,PerfumeResponse } from './perfume.service';

@Controller('perfume')
export class PerfumeController {
    constructor(private readonly perfumeService:PerfumeService){}

    @Get()
    async getAllPerfumes(){
        const perfumes = await this.perfumeService.fetchPerfumes()
        return perfumes
    }


    @Get("/:id")
    async getOnePerfume(@Param('id') id:string, @Res() res):Promise<PerfumeResponse>{
        try{
        console.log('called me')
        const perfume = await this.perfumeService.fetchPerfumeById(id)
    
        return res.render('index',{perfume}) 
    }catch(error){
        console.log("Error fetching response",error)
        return undefined
    }
   }
}
