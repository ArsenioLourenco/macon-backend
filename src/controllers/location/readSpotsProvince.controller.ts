import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import { Spots } from '../../models/Spots';
import ReadSpotProvince, { IReadSpotsProvince } from '../../services/location/readSpotsProvince.service';
export default class ReadSpotsProvinceController {
    async handle(request: Request<IReadSpotsProvince>, response: Response<AppResponse<Spots[]>>) {
        try {
            const {id} = request.body;
            const serviceReadSpotProvince = new ReadSpotProvince();
            const spotsProvince = await serviceReadSpotProvince.execute({id});

            if (spotsProvince) {
                return response
                    .json({
                        success: true,
                        message: 'Informacao dos Pontos por provincia',
                        data: spotsProvince
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