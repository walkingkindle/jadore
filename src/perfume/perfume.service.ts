/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
const API_TOKEN = process.env.STRAPI_API_TOKEN

export interface PerfumeResponse {
    Id:String,
    Name:String,
    Price:Number,
    Description:String,
    Image:String,

}
@Injectable()
export class PerfumeService {
    async fetchPerfumes(){
        const config = {
            headers:{
                Authorziation:`Bearer ${API_TOKEN}`
            },
        }
        try{
            const response = await axios.get("http://127.0.0.1:1337/api/perfumes?populates=true",config)
            const data = response.data
            return response.data
        }catch(error){
            console.error('Error fetching perfumes:',error)
            return[]
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
            console.log("dataIs", response.data);
            console.log(response.data.data.id)

            const singlePerfume:PerfumeResponse = {
                Id : response.data.data.id,
                Name: response.data.data.attributes.Name,
                Description: response.data.data.attributes.Description,
                Price: response.data.data.attributes.Price,
                Image:response.data.data.attributes.Image.data[0].attributes.formats.large.url,
            }
           return singlePerfume 
        }catch(error){
            console.error('Error fetching perfumes',error)
            return undefined
        }
    }
}
