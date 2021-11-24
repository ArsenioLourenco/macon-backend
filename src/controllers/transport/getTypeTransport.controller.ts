import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TypeTransportRepository from "../../repositories/typeTransport.repository";


export default class GetAllTypeTransportsController{
    async handle(request:Request, response: Response){
        const typeTransportRepository = getCustomRepository(
           TypeTransportRepository
        );

        try{
            const getAllTypeTransports = await typeTransportRepository.find()
            if(getAllTypeTransports){
                return response.status(200)
                .json({
                    success: true,
                    message: 'Transports',
                    data: getAllTypeTransports
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