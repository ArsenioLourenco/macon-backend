import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { AgendTravels } from "../../models/AgendTravels";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";



export default class GetAgendTravelByPersonalCodeController{
    async handle(request: Request, response: Response<AppResponse<AgendTravels[]>>){
        try{
            const {personalCodeAgend} = request.params;
            console.log('Phone: ', personalCodeAgend);
            if(!personalCodeAgend){
                return response.json({success: false, message: 'Precisas Informar o Código da Reserva.' })
            }
            const agendTravelRepository = getCustomRepository(AgendTravelsRepository);
            const agendTravel = await agendTravelRepository.findOne({ where:{personalCodeAgend}, relations:['travel', 'travel.originProvince', 'travel.destinyProvince', 'travel.transport']});
            console.log("reserve", personalCodeAgend)
            if(agendTravel){
                return response.status(200).json(
                    { success: true, message: 'Dados da Reserva:', data: agendTravel }
                );
            }
            return response.status(400).json(
                { success: false, message: "Verifique se o código está correcto/Essa reserva não existe."}
            );
        }catch(err){
            return response.status(500).json(
                { success: false, message: err.message }
            );
        }
    }
}

