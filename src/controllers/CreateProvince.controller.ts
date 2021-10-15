

import { Request, Response } from 'express';
import { AppResponse } from '../@types';
import { Provinces } from '../models/Provinces';
import CreateProvince, { ICreateProvince } from '../services/CreateProvince.service';

export default class CreateProvinceController {
    async handle(request: Request<ICreateProvince>, response: Response<AppResponse<Provinces[]>>) {
        const { name, region, code, countryID } = request.body;
        const provinceService = new CreateProvince();
        const provinceExist = await provinceService.execute({ name, region, code, countryID });

        try {
            if (!provinceExist) {
                return response.json({
                    success: false,
                    message: 'Failed'
                });
            } else {
                return response.status(200)
                    .json({
                        success: true,
                        message: 'Created successfully',
                        data: provinceExist
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