import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { AgendTravels } from "../../models/AgendTravels";
import AgendTravelReferenceService, { IAgendTravelReference } from "../../services/agendTravels/getAgentTravelReference.service";
export default class GetAgendTravelByReferenceController{
    async handle(request: Request<IAgendTravelReference>, response: Response<AppResponse<AgendTravels[]>>){
        try{
            const { reference } = request.params;
            const referenceService =  new AgendTravelReferenceService()
            const serviceReference = await referenceService.execute({reference})
            
            if (serviceReference) {
                return response
                    .json({
                        success: true,
                        message: 'Resultado de Agendamento',
                        data: serviceReference
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