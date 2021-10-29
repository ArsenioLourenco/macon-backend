import { Request, Response } from 'express';
import { AppResponse } from '../../../@types';
import { Countries } from '../../../models/Countries';
import UpdateCountryService, { IUpdateCountry } from '../../../services/location/country/updateCountry.service';
export default class UpdateCountryController {
    async handle(request: Request<IUpdateCountry>, response: Response<AppResponse<Countries[]>>) {
        try {
            const serviceCountry = new UpdateCountryService();
            const { id, name, region, code } = request.body;
            const updateCountry = await serviceCountry.execute({ id, name, region, code });
            if (updateCountry) {
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
                    message: 'Erro ao actualizar o Pais, ' + error.message,
                })
        }
    }
}