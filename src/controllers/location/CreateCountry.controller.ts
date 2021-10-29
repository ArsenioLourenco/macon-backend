import { Request, Response } from 'express';
import { ICreateCountry, AppResponse } from '../../@types';
import { Countries } from '../../models/Countries';
import CreateCountryService from '../../services/location/createCountry.service';

export default class CreateCountryController {
    async handle(request: Request<ICreateCountry>, response: Response<AppResponse<Countries[]>>) {
        try {
            const { name, region, code } = request.body;
            const serviceCreateCountry = new CreateCountryService();
            const createCountry = await serviceCreateCountry.execute({ name, region, code })

            if (createCountry) {
                return response
                    .json({
                        success: true,
                        message: name + ' created successfully',
                        data: createCountry
                    });
            } else {
                return response
                    .json({
                        success: false,
                        message: name + ' Ja existe na BD',
                        data: createCountry
                    })
            }
        } catch (error) {
            return response
                .json({
                    success: false,
                    message: 'Erro ao crear um Pais, ' + error.message,
                })
        }
    }
}