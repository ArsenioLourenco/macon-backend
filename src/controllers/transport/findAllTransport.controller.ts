import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/Transport";

export default class GetAllTransportsController{
    async handle(request:Request, response: Response){
        const transportRepository = getCustomRepository(
            TransportRepository
        );

        try{
            const getAllTransports = await transportRepository.find()
            if(getAllTransports){
                return response.status(200)
                .json({ success: true, message: 'Todos Transportes', data: getAllTransports });
            }
            else {
                return response.status(400)
                    .json({ success: false, message: 'Não Existe transportes Cadastrados' });
            }
        }catch(err){
            return response.status(500)
                .json({ success: false, message: err.message})
        }
    }
}