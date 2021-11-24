import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/Transport";


export default class GetAllTransportsController{
    async handle(request:Request, response: Response){
        const transportRepository = getCustomRepository(
            TransportRepository
        );
        
        try{
            const getAllTransports = await transportRepository.find({relations:['typeTransport']})
            if(getAllTransports){
                return response.status(200)
                .json({
                    success: true,
                    message: 'Transports',
                    data: getAllTransports
                });
            }
            else {
                return response.status(400)
                    .json({
                        success: false,
                        message: 'Transports is empty'
                    });
            }
        }catch(err){
            return err.message;
        }
    }
}