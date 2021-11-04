import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { Travels } from "../../models/Travels";
import TravelsRepository from "../../repositories/travels.repository";

export default class GetTravelByIdController{
    async handle(request: Request<number>, response: Response<AppResponse<Travels[]>>, id:number){
        try{
            const 
                travelsRepository = getCustomRepository( TravelsRepository ),
                getting = await travelsRepository.findOne( id );
            if(getting){
                return response.status(200)
                    .json({ success:true, data: getting });
            }
            return response.status(400)
                .json({ success: false, message: 'Não Temos Essa Viagem Agendada.' });
        } catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}