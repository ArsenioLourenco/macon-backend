import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { Travels } from "../../models/Travels";
import CreateTravels, { IcreateTravels } from "../../services/travels/createTravels.service";

export default class CreateTravelsController {
    async handle(request: Request<IcreateTravels>, response: Response<AppResponse<Travels[]>>) {
        try {
            const
                createTravelsService = new CreateTravels(), 
                { ... price } = request.body,
                creating = await createTravelsService.execute({ ... price });
            return response.status(201)
                .json({ success: true, message: "Viagem Criada.", data: creating });
        }
        catch(err) {
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}