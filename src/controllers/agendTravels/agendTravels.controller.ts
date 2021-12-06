import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { getCustomRepository } from "typeorm";
import { AgendTravels } from "../../models/AgendTravels";
import AgendTravelsService, {
  IAgendTravel,
} from "../../services/agendTravels/agendTravel.service";
import TravelsRepository from "../../repositories/travels.repository";
export default class AgendTravelsController {
  async handle(
    request: Request<IAgendTravel>,
    response: Response<AppResponse<AgendTravels[]>>
  ) {
    try {
      const { placesReserve, travelId, phoneNumber, email, name, baggage } =
        request.body;
      const agendTravelService = new AgendTravelsService();

      if (placesReserve <= 0) {
        return response.status(400).json({
          success: false,
          message: "Passe Por favor uma quantidade de Lugares Justa!",
        });
      }

      const agend = await agendTravelService.execute({
        placesReserve,
        travelId,
        phoneNumber,
        email,
        name,
        baggage,
      });
      console.log(agend);
      return response.status(201).json({ success: true, message: agend });
    } catch (err) {
      return response
        .status(500)
        .json({ success: false, message: err.message });
    }
  }
}
