import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { AgendTravels } from "../../models/AgendTravels";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";

export default class GetCancelledAgendTravelsController{
    async handle(request: Request, response: Response<AppResponse<AgendTravels[]>>){
        try{
            const agendTravelRepository = getCustomRepository(AgendTravelsRepository);
            const getCancelledTravels = await agendTravelRepository.find(
                { where: { status: 'Reserva Cancelada'} }
            );
            if((getCancelledTravels).length > 0){
                return response.status(200).json(
                    { success: true, message: 'Reservas Canceladas:', data: getCancelledTravels }
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