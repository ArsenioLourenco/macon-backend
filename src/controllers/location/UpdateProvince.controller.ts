import { Request, Response } from 'express';
import { AppResponse } from "../../@types";
import { Provinces } from '../../models/Provinces';
import UpdateProvince, { IUpdateProvince } from "../../services/location/updateProvince.service";

export default class CreateCountryController {
    async handle(request: Request<IUpdateProvince>, response: Response<AppResponse<Provinces[]>>) {
        try {
            const serviceProvince = new UpdateProvince();
            const { id, name, region, code} = request.body;
            const updateProvince = await serviceProvince.execute({ id, name, region, code});
            
            if (updateProvince) {
                return response
                    .json({
                        success: true,
                        message: name + ', updated successfully.',
                    });
            } else {
                return response
                    .json({
                        success: false,
                        message: 'Nao actualizado...' + name,
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