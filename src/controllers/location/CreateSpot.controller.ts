import { Request, Response } from 'express';
import { AppResponse } from "../../@types";
import { Spots } from '../../models/Spots';
import { ICreateSpot, CreateSpot } from "../../services/location/CreateSpot.service";




export default class CreateSpotController {
    async handle(request: Request<ICreateSpot>, response: Response<AppResponse<Spots[]>>) {
        const { name, description, location, contact, provinceID } = request.body;
        const spotService = new CreateSpot();
        const spotExist = await spotService.execute({ name, description, location, contact, provinceID });

        try {
            if (!spotExist) {
                return response.json({
                    success: false,
                    message: 'Failed'
                });
            } else {
                return response.status(200)
                    .json({
                        success: true,
                        message: 'Created successfully',
                        data: spotExist
                    })
            }

        } catch (error) {
            return response
                .json({
                    success: false,
                    message: error.message
                })
        }
    }
}