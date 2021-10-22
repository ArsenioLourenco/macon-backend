import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import { Spots } from '../../models/Spots';
import ReadSpotByID, { IReadSpotByID } from '../../services/location/readSpotByID.service';
export default class ReadSpotByIDController {
    async handle(request: Request<IReadSpotByID>, response: Response<AppResponse<Spots[]>>) {
        try {
            const id = request.params.id;
            const serviceReadSpotID = new ReadSpotByID();
            const spotID = await serviceReadSpotID.execute({id});

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