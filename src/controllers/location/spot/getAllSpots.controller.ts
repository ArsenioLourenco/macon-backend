import { Request, Response } from 'express';
import { AppResponse } from '../../../@types';
import { Spots } from '../../../models/Spots';
import SpotsService from '../../../services/location/spot/getAllSpots.service';
export default class GetSpotsController {
    async handle(request: Request, response: Response<AppResponse<Spots[]>>) {
        try {
            const serviceSpot = new SpotsService();
            const spots = await serviceSpot.execute();
            if (spots) {
                return response
                    .json({
                        success: true,
                        message: 'Lista dos Pontos',
                        data: spots
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