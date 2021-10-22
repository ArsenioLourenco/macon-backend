

import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import { Provinces } from '../../models/Provinces';
import ReadProvinces from '../../services/location/readProvince.service';
export default class ReadProvincesController {
    async handle(request: Request, response: Response<AppResponse<Provinces[]>>) {
        try {
            const serviceReadProvinces = new ReadProvinces();
            const provinces = await serviceReadProvinces.execute();

            if (provinces) {
                return response
                    .json({
                        success: true,
                        message: 'Lista das Provincias',
                        data: provinces
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