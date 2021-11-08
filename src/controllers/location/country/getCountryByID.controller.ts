import { Request, Response } from 'express';
import { AppResponse } from '../../../@types';
import { Countries } from '../../../models/Countries';
import CountryByIDService, { ICountryByID } from '../../../services/location/country/getCountryByID.service';
export default class GetCountryByIDController {
    async handle(request: Request<ICountryByID>, response: Response<AppResponse<Countries[]>>) {
        try {
            const id = request.params.id;
            const serviceCountryID = new CountryByIDService();
            const countryID = await serviceCountryID.execute({id});
            if (countryID) {
                return response
                    .json({
                        success: true,
                        message: 'Informacao do Pais',
                        data: countryID
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