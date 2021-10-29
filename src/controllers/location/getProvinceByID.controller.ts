import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppResponse } from '../../@types';
import { Provinces } from '../../models/Provinces';
import ProvinceByIDService, { IProvinceByID } from '../../services/location/getProvinceByID.service';

export default class GetProvinceByIDController {
    async handle(request: Request<IProvinceByID>, response: Response<AppResponse<Provinces[]>>) {
        try {
            const id = request.params.id;
            const serviceProvinceByID = new ProvinceByIDService();
            const provinceID = await serviceProvinceByID.execute({id})

            if (provinceID) {
                return response
                    .json({
                        success: true,
                        message: 'Informacao da Provincia',
                        data: provinceID
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