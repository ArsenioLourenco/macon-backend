import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { AgendTravels } from "../../models/AgendTravels";
import AgendTravelContactReferenceService, { IAgendTravelContactReference } from "../../services/agendTravels/agentTravelReference.service";

export default class GetAgendTravelByContactReferenceController{
    async handle(request: Request<IAgendTravelContactReference>, response: Response<AppResponse<AgendTravels[]>>){
        try{
            const { reference } = request.params;
            console.log('Phone: ', reference);
            const serviceContactReference =  new AgendTravelContactReferenceService()
            const contactServiceExec = await serviceContactReference.execute({reference})
            
            if (contactServiceExec) {
                return response
                    .json({
                        success: true,
                        message: 'Resultado de Agendamento',
                        data: contactServiceExec
                    });
            }
            else {
                return response
                    .json({
                        success: false,
                        message: 'Nao existe'
                    });
            }
        }catch(err){
            return response.status(500).json(
                { success: false, message: err.message }
            );
        }
    }
}