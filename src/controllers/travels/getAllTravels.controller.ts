import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TravelsRepository from "../../repositories/travels.repository";





export default class GetAllTravels{
    async handle(request: Request, response: Response){
        const travelsRepository= getCustomRepository(TravelsRepository)
        try{
            const getAllTravels= await travelsRepository.find()
            if(getAllTravels){
                return response.status(200)
                .json({
                    success: true, 
                    message: '',
                    data: getAllTravels
                })
            }
            else {
                return response.status(200)
                .json({
                    success: false,
                    message: 'Not exist travels'
                })
            }
        }
        catch(err){
            return err;
        }
    }
}