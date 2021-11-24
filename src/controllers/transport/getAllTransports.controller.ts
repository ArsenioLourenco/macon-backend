import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/Transport";


export default class GetAllTransportsController{
    async handle(request:Request, response: Response){
        const transportRepository = getCustomRepository(
            TransportRepository
        );
        
        try{
            const transports = await transportRepository.find({relations:['typeTransport']})
            if(transports){
                return response.status(200)
                .json({
                    success: true,
                    message: 'Transports',
                    data: transports
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