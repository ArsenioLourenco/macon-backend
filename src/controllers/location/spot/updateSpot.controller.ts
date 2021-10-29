import { Request, Response } from 'express';
import { AppResponse } from '../../../@types';
import { Spots } from '../../../models/Spots';
import UpdateSpotService, { IUpdateSpot } from '../../../services/location/spot/updateSpot.service';
export default class UpdateSpotController {
    async handle(request: Request<IUpdateSpot>, response: Response<AppResponse<Spots[]>>) {
        try {
            const serviceSpot = new UpdateSpotService();
            const { id, name, description, location, contacts } = request.body;
            const updateSpot = await serviceSpot.execute({ id, name, description, location, contacts });
            if (updateSpot) {
                return response
                    .json({
                        success: true,
                        message: name + ', updated successfully.',
                        data: updateSpot
                    });
            } else {
                return response
                    .json({
                        success: false,
                        message: 'Nao actualizado...' + name,
                        data: updateSpot
                    })
            }
        } catch (error) {
            return response
                .json({
                    success: false,
                    message: 'Erro ao actualizar a Provincia, ' + error.message,
                })
        }
    }
}