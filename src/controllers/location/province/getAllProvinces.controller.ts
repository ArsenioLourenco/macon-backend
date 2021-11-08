import { Request, Response } from 'express';
import { AppResponse } from '../../../@types';
import { Provinces } from '../../../models/Provinces';
import ProvincesService from '../../../services/location/province/getAllProvinces.service';
import { IProvince } from '../../../services/location/province/getAllProvinces.service';

export default class GetProvincesController {
    async handle(request: Request<IProvince>, response: Response<AppResponse<Provinces[]>>) {

        try {
            const id = request.params.id;
            const serviceProvinces = new ProvincesService();
            const provinces = await serviceProvinces.execute({id});
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
            return response.status(500).json(
                { success: false, message: err.message }
            );
        }
    }
}