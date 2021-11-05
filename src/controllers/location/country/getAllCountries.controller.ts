import { Request, Response } from 'express';
import { AppResponse } from '../../../@types';
import { Countries } from '../../../models/Countries';
import CountriesService from '../../../services/location/country/getAllCountries.service';
export default class GetCountriesController {
    async handle(request: Request, response: Response<AppResponse<Countries[]>>) {
        try {
            const serviceCountries = new CountriesService();
            const countries = await serviceCountries.execute();
            if (countries) {
                return response
                    .json({
                        success: true,
                        message: 'Lista dos Paises',
                        data: countries
                    });
            }else {
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