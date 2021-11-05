import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { Travels } from "../../models/Travels";
import TravelsRepository from "../../repositories/travels.repository";

export interface IGetTravel{
    originProvince:number,
    destinyProvince:number,
    departureDate:Date,
    returnDate?: Date

}

export default class GetTravelsController{
    async handle(request: Request<IGetTravel>, response: Response<AppResponse<Travels[]>>){
        const {originProvince, destinyProvince, departureDate, returnDate}= request.body;
        try{
            const 
                travelsRepository = getCustomRepository( TravelsRepository ),
                getting = await travelsRepository.find( {where:{originProvince, destinyProvince, departureDate}, relations: ['transport', 'originProvince', 'destinyProvince']});
                
            if(getting){
                console.log(originProvince, destinyProvince, departureDate)
                return response.status(200)
                    .json({ success:true, data: getting });
            }
else{
                console.log("rosa")
                return response.status(400)
                .json({ success: false, message: 'Não Temos Essa Viagem Agendada.'});
            }
            
        } catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}