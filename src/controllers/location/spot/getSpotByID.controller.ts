import { Request, Response } from 'express';
import { AppResponse } from '../../../@types';
import { Spots } from '../../../models/Spots';
import SpotByIDService, { ISpotByID } from '../../../services/location/spot/getSpotByID.service';
export default class GetSpotByIDController {
    async handle(request: Request<ISpotByID>, response: Response<AppResponse<Spots[]>>) {
        try {
            const id = request.params.id;
            const serviceSpotID = new SpotByIDService();
            const spotID = await serviceSpotID.execute({id});
            if (spotID) {
                return response
                    .json({
                        success: true,
                        message: 'Informacao do Ponto',
                        data: spotID
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