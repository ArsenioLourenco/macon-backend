import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { IAgendTravel } from "../../services/agendTravels/agendTravel.service";
import AgendTravels from '../../services/agendTravels/agendTravel.service';
export default class AgendTravelsController {
    async handle(request: Request<IAgendTravel>, response: Response<AppResponse<AgendTravels[]>>) {
        try {
            const { placesReserve, travelId, phoneNumber, email } = request.body;
            const agendTravel = new AgendTravels();
            const agending = await agendTravel.execute({ placesReserve, travelId, phoneNumber, email });
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

        } catch (err) {
            return response.status(500).json(
                { success: false, message: err.message }
            );
        }
    }
}