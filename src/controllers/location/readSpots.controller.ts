import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import { Spots } from '../../models/Spots';
import ReadSpots from '../../services/location/readSpots.service';
export default class ReadSpotsController {
    async handle(request: Request, response: Response<AppResponse<Spots[]>>) {
        try {
            const serviceReadSpot = new ReadSpots();
            const spot = await serviceReadSpot.execute();

            if (spot) {
                return response
                    .json({
                        success: true,
                        message: 'Lista dos Pontos',
                        data: spot
                    });
            }
            else {
                return response
                    .json({
                        success: false,
                        message: 'Nao existe'
                    });
            }
        } catch (err) {
            return err;
        }
    }
}