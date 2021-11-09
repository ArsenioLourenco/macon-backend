import { request, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { Travels } from "../../models/Travels";
import TravelsRepository from "../../repositories/travels.repository";

export default class GetByIdTravelsController{
    
    async handle(request: Request, response: Response<AppResponse<Travels[]>>){
        const {id}= request.params;
        try{
            const travelsRepository = getCustomRepository(TravelsRepository);
            const getAllTravels = await travelsRepository.findOne({where:{id}, 
                relations: ['transport', 'originProvince', 'destinyProvince']
            });

            if(getAllTravels){
                return response.status(200)
                    .json({ success: true, message: 'Viagens Disponíveis', data: getAllTravels });
            }
            return response.status(400)
                .json({ success: false, message: 'Sem Viagens Disponíveis' });
        }
        catch(err){
            return response.status(500)
                .json({ success: false, message: 'Servidor Indisponível' });
        }
    }
}