import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { AgendTravels } from "../../models/AgendTravels";
import AgendTravelContactReferenceService, { IAgendTravelContactReference } from "../../services/agendTravels/agentTravelContactReference.service";

export default class GetAgendTravelByContactReferenceController{
    async handle(request: Request<IAgendTravelContactReference>, response: Response<AppResponse<AgendTravels[]>>){
        try{
            const { contactReference } = request.params;
            console.log('Phone: ', contactReference);
            const serviceContactReference =  new AgendTravelContactReferenceService()
            const contactServiceExec = await serviceContactReference.execute({contactReference})
            
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