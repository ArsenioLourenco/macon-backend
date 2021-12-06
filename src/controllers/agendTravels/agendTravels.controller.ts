import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { getCustomRepository } from "typeorm";
import { AgendTravels } from "../../models/AgendTravels";
import AgendTravelsService, { IAgendTravel } from "../../services/agendTravels/agendTravel.service";
import TravelsRepository from '../../repositories/travels.repository';
export default class AgendTravelsController {
    async handle(request: Request<IAgendTravel>, response: Response<AppResponse<AgendTravels[]>>) {
        try {
            const { placesReserve, travelId, phoneNumber, email } = request.body;
            const travelRepository = getCustomRepository(TravelsRepository);
            const verifyIfExistTravel = await travelRepository.findOne(travelId);
            const agendTravelService = new AgendTravelsService();
            const agending = await agendTravelService.execute({ placesReserve, travelId, phoneNumber, email });

            if (!verifyIfExistTravel) {
                return response.status(400).json(
                    { success: false, message: "Lamentamos, mas não temos viagens para esse trajscto, dirija-se a um terminal mais próximo de si!" }
                );
            }else{

                if (placesReserve == 0) {
                    return response.status(400).json(
                        { success: false, message: "Passe Por favor uma quantidade de Lugares Justa!" }
                    );
                }
                if (agending) {
                    return response.status(201).json(
                        { success: true, message: agending }
                    );
                }
            }
            
        } catch (err) {
            return response.status(500).json(
                { success: false, message: err.message }
            );
        }
    }
}