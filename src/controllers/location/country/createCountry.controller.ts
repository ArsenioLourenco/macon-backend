import { Request, Response } from 'express';
import { AppResponse } from '../../../@types';
import { Countries } from '../../../models/Countries';
import CreateCountryService, { ICreateCountry } from '../../../services/location/country/createCountry.service';

export default class CreateCountryController {
    async handle(request: Request<ICreateCountry>, response: Response<AppResponse<Countries[]>>) {
        try {
            const { name, region, code } = request.body;
            const createCountryService = new CreateCountryService();
            const createCountry = await createCountryService.execute({ name, region, code })

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