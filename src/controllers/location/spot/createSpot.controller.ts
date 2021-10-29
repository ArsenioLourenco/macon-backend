import { Request, Response } from 'express';
import { AppResponse } from '../../../@types';
import { Spots } from '../../../models/Spots';
import CreateSpotService, { ICreateSpot } from '../../../services/location/spot/createSpot.service';
export default class CreateSpotController {
    async handle(request: Request<ICreateSpot>, response: Response<AppResponse<Spots[]>>) {
        try {
            const { name, description, location, contacts, province } = request.body;
            const createSpotService = new CreateSpotService();
            const createSpot = await createSpotService.execute({ name, description, location, contacts, province });

            if (createSpot) {
                return response.json({
                    success: true,
                    message: name + ' Created successfully',
                    data: createSpot
                });
            } else {
                return response
                    .json({
                        success: false,
                        message: 'Ponto ja existente',
                        data: createSpot
                    })
            }
        } catch (error) {
            return response
                .json({
                    success: false,
                    message: 'Erro ao criar um ponto ' + error.message
                })
        }
    }
}