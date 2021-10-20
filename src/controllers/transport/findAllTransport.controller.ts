import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/transports.repository";


export default class FindAllTransportController{
    async handle(request:Request, response: Response){
        const transportRepository = getCustomRepository(
            TransportRepository
        );

        try{
            const getAllTransports = await transportRepository.find()
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