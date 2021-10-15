import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import { Countries } from '../../models/Countries';
import CreateCountry, { ICreateCountry } from '../../services/location/CreateCountry.service';
export default class CreateCountryController {
    async handle(request: Request<ICreateCountry>, response: Response<AppResponse<Countries[]>>) {
        const { name, region, code } = request.body;
        const countryService = new CreateCountry();
        const countryExist = await countryService.execute({ name, region, code });

        try {
            if (!countryExist) {
                return response.json({
                    success: false,
                    message: 'Failed'
                });
            } else {
                return response.status(200)
                    .json({
                        success: true,
                        message: 'Created successfully',
                        data: countryExist
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