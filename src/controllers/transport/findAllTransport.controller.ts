import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/transports.repository";





export default class FindAllTransportController{
    async handle(request:Request, response: Response){
        const transportRepository = getCustomRepository(
            TransportRepository
        )

        try{
            const readyAllTransport = await transportRepository.find()
            if(readyAllTransport){
                return response
                .status(200)
                .json({
                    success: true,
                    message: 'All Transport',
                    data: readyAllTransport
                });
                

            }
            else {
                return response
                    .status(400)
                    .json({
                        success: false,
                        message: 'Table Transport void'
                    });

            }
        } catch(err){
            return err
        }
    }
}