import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import { Countries } from '../../models/Countries';
import ReadCountries from '../../services/location/readCountries.service';
export default class ReadCountriesController {
    async handle(request: Request, response: Response<AppResponse<Countries[]>>) {
        try {
            const serviceReadCountries = new ReadCountries();
            const country = await serviceReadCountries.execute();

            if (country) {
                return response
                    .json({
                        success: true,
                        message: 'Lista dos Paises',
                        data: country
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