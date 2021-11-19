import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { AgendTravels } from "../../models/AgendTravels";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";

export default class GetAgendTravelByPhoeNumberController{
    async handle(request: Request<string>, response: Response<AppResponse<AgendTravels[]>>){
        try{
            const { phoneNumber } = request.params;
            if(!phoneNumber){
                return response.json({success: false, message: 'Precisas Informar o Telefone da Reserva.' })
            }
            const agendTravelRepository = getCustomRepository(AgendTravelsRepository);
            const getAgendTravel = await agendTravelRepository.findOne(
                { where: { phoneNumber} }
            );
            if(getAgendTravel){
                return response.status(200).json(
                    { success: true, message: 'Dados da Reserva:', data: getAgendTravel }
                );
            }
            return response.status(400).json(
                { success: false, message: "Verifique seu telefone está correcto/Não Efetuou Reserva Nenhuma."}
            ); 
        }catch(err){
            return response.status(500).json(
                { success: false, message: err.message }
            );
        }
    }
}