import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import AgendTravels, {
  IAgendTravel,
} from "../../services/agendTravels/agendTravel.service";

export default class AgendTravelsController {
  async handle(
    request: Request<IAgendTravel>,
    response: Response<AppResponse<string>>
  ) {
    try {
      const agendTravelService = new AgendTravels();
      const agending = await agendTravelService.execute(request.body);
      if (agending) {
        return response.json({ success: true, message: agending });
      }
      return response
        .status(400)
        .json({ success: false, message: "Error: Tente novamente" });
    } catch (err) {
      return response
        .status(500)
        .json({ success: false, message: err.message });
    }
  }
}
