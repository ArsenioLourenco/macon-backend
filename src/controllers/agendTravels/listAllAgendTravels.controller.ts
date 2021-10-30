import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { AgendTravels } from "../../models/AgendTravels";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";


export default class ListAllAgendTravelsController{
    async handle(request: Request, response: Response<AppResponse<AgendTravels[]>>){
        try{
            const agendTravelRepository = getCustomRepository(AgendTravelsRepository);
            const getAllAgendTravels = agendTravelRepository.find();
            if(getAllAgendTravels){
                return response.status(200).json(
                    { success: true, message: 'Todas Reservas.', data: getAllAgendTravels }
                );
            }
            return response.status(400).json(
                { success: false, message: "Sem Reservas."}
            ); 
        }catch(err){
            return response.status(500).json(
                { success: false, message: err.message }
            );
        }
    }
}