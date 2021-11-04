import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { AgendTravels } from "../../models/AgendTravels";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";

export default class CancelReserveController{
    async handle(request: Request<string>, response: Response<AppResponse<AgendTravels[]>>){
        try{
            const { codeReserve } = request.body;
            const agendTravelRepository = getCustomRepository(AgendTravelsRepository);
            if(!codeReserve){
                return response.json({success: false, message: 'Precisas Informar o Código da Reserva.' })
            }
            if(!(await agendTravelRepository.findOne({where: { personalCodeAgend: codeReserve }}))){
                return response.status(400).json(
                    { success: false, message: "Verifique se o código está correcto/Essa reserva não existe."}
                ); 
            }
            const cancelReserve = agendTravelRepository
                .createQueryBuilder()
                .update()
                .set(
                    { status: "Reserva Cancelada" }
                )
                .where("personalCodeAgend = :personalCodeAgend", { personalCodeAgend: codeReserve })
                .execute();
            if(cancelReserve){
                return response.status(200).json(
                    { success: true, message: 'Reserva Cancelada.' }
                );
            }
        }catch(err){
            return response.status(500).json(
                { success: false, message: err.message }
            );
        }
    }
}