import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { AgendTravels } from "../../models/AgendTravels";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";

export default class GetCanceledAgendTravelsController{
    async handle(request: Request, response: Response<AppResponse<AgendTravels[]>>){
        try{
            const agendTravelRepository = getCustomRepository(AgendTravelsRepository);
            const getCanceledTravels = await agendTravelRepository.find(
                { where: { status: 'Reserva Cancelada'} }
            );
            if((getCanceledTravels).length > 0){
                return response.status(200).json(
                    { success: true, message: 'Reservas Canceladas:', data: getCanceledTravels }
                );
            }
            return response.status(200).json(
                { success: true, message: "Sem Reservas Canceladas."}
            ); 
        }catch(err){
            return response.status(500).json(
                { success: false, message: err.message }
            );
        }
    }
}