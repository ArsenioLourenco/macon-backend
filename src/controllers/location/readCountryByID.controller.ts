import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import { Countries } from '../../models/Countries';
import ReadCountryByID, { IReadCountryByID } from '../../services/location/readCountryByID.service';
export default class ReadCountryByIDController {
    async handle(request: Request<IReadCountryByID>, response: Response<AppResponse<Countries[]>>) {
        try {
            const id = request.params.id;
            const serviceReadCountryID = new ReadCountryByID();
            const countryID = await serviceReadCountryID.execute({id});

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