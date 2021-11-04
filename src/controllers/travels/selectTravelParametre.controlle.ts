import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TravelsRepository from "../../repositories/travels.repository";


export default class SelectTravelParametres{
    async handle(request:Request, response:Response){
      const travelsRepository= getCustomRepository(TravelsRepository)
      const {originProvince, 
        destinyProvince}= request.body;
      try{
       const selectTravelParametres = travelsRepository.find({where:{}})
       
      }
      catch(e){

      }
    }
}