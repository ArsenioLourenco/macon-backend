import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { Travels } from "../../models/Travels";
import TravelsRepository from "../../repositories/travels.repository";

export interface IGetTravel {
    originProvince: number,
    destinyProvince: number,
    departureDate: Date,
    returnDate?: Date
}

export default class GetTravelsController {
    async handle(request: Request<IGetTravel>, response: Response<AppResponse<Travels[]>>) {
        try {
            const { originProvince, destinyProvince, departureDate, returnDate } = request.params;
            const date = new Date();
            const today = date.toLocaleDateString().split("/");

           if(departureDate){
          const partida = departureDate.toLocaleString().split("-")
          if(today[2]==partida[0] && today[1]==partida[1] && today[0]>partida[2]){
            response.status(400).json({success: false, message: 'essa viagem já ocorreu'})
            
        }
       
           }
         
            if (!returnDate) {
                const
                    travelsRepository = getCustomRepository(TravelsRepository),
                    getting = await travelsRepository.find(
                        { 
                            where: { originProvince, destinyProvince, departureDate }, 
                            relations: ['originProvince', 'destinyProvince', 'transport'] 
                        }
                    );
                if (getting.length != 0) {
                    return response.status(200)
                        .json({ success: true, data: getting });
                }
                else {
                    return response.status(400)
                        .json({ success: false, message: 'Não Temos Essa Viagem Agendada.' });
                }
            }
            const
                travelsRepository = getCustomRepository(TravelsRepository),
                getting = await travelsRepository.find(
                    { 
                        where: { originProvince, destinyProvince, departureDate, returnDate }, 
                        relations: ['originProvince', 'destinyProvince'] 
                    }
                );
            if (getting.length != 0) {
                return response.status(200)
                    .json({ success: true, data: getting });
            }
            else {
                return response.status(400)
                    .json({ success: false, message: 'Não Temos Essa Viagem Agendada.' });
            }
        } catch (err) {
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}