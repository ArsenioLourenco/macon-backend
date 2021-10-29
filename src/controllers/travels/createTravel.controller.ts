import { Request, Response } from "express";
import CreateTravels, { IcreateTravels } from "../../services/travels/createTravels.service";

export default class CreateTravelsController {
    async handle(request: Request<IcreateTravels>, response: Response) {
        const { departureDate, returnDate, timeToGoTo, timeToArrival, observations, spotId, originProvince, destinyProvince, transportId, price } = request.body;

        const createTravels = new CreateTravels()
        try {
            const travel = await createTravels.execute({
                departureDate,
                returnDate,
                timeToGoTo,
                timeToArrival,
                observations,
                spotId,
                originProvince,
                destinyProvince,
                transportId,
                price,
            });

            if (travel) {
                return response

                    .json({
                        success: true,
                        message: "Travel Created sucessify",
                        data: travel
                    })
            }
            else {
                if (travel) {
                    return response
                        .json({
                            success: false,
                            message: "Travel Created falhou",
                            data: travel
                        })
                }
            }
        }
        catch (err) {
            return err
        }


    }
}