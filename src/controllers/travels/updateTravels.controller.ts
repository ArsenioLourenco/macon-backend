import { Request, Response } from "express";
import UpdateTravel, { IUpdateTravels } from "../../services/travels/updateTravels.service";

export default class UpdateTravelsController {
    async handle(request: Request<IUpdateTravels>, response: Response) {
       
        try {
            const { id,
                departureDate,
                returnDate,
                timeToGoTo,
                timeToArrival,
                observations,
                spotId,
                originProvince,
                destinyProvince,
                transportId,
                price } = request.body;
    
            const updateTravels = new UpdateTravel();
            const update = await updateTravels.execute({
                id,
                departureDate,
                returnDate,
                timeToGoTo,
                timeToArrival,
                observations,
                spotId,
                originProvince,
                destinyProvince,
                transportId,
                price
            }) 
            if (update) {
                return response.json({
                    success: true,
                    data: update
                })
            }
        }
        catch (err) {
            return err
        }
    }
}

