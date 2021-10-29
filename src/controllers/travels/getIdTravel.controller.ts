import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TravelsRepository from "../../repositories/travels.repository";


export default class GetIdTravels{
    async handle(request:Request, response:Response, id:number){
        const travelsRepository= getCustomRepository(TravelsRepository)
        try{
            const getIdTravels= await travelsRepository.findOne(id)
            if(getIdTravels){
                return response.status(200)
                .json({
                    success:true,
                    message: '',
                    data: getIdTravels
                })
            }

            else{
                return response.status(200)
                .json({
                    success: false,
                    message: 'This travel not exist'
                })
            }
        } catch(err){
            return err;
        }
    }
}