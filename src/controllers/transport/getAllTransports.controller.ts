import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { Transport } from "../../models/Transport";
import TransportRepository from "../../repositories/Transport";

export default class GetAllTransportsController{
    async handle(request:Request, response: Response<AppResponse<Transport[]>>){
        try{
            const 
                transportRepository = getCustomRepository( TransportRepository ),
                allTransports = await transportRepository.find();

            if(allTransports){
                return response.status(200)
                    .json({ success: true, message: 'Todos Transportes', data: allTransports });
            }
            return response.status(400)
                .json({ success: false, message: 'Sem Transports Disponíveis' });
        }catch(err){
            return response.status(500)
                .json({ success: false, message: err.message})
        }
    }
}