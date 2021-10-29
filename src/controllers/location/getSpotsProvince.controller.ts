import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import { Spots } from '../../models/Spots';
import SpotsProvinceService, { ISpotsProvince } from '../../services/location/getSpotsProvince.service';

export default class GetSpotsProvinceController {
    async handle(request: Request<ISpotsProvince>, response: Response<AppResponse<Spots[]>>) {
        try {
            const {id} = request.body;
            const serviceSpotProvince = new SpotsProvinceService();
            const spotsProvince = await serviceSpotProvince.execute({id});

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