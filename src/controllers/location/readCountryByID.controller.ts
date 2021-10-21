import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppResponse } from '../../@types';
import { Countries } from '../../models/Countries';
import CountryRepository from '../../repositories/country.repository';
import { IReadCountryID } from '../../services/location/readCountryByID.service';


export default class ReadCountryByIDController {
    async handle(request: Request<IReadCountryID>, response: Response<AppResponse<Countries[]>>) {
        try {
            const id = request.params.id;
            const countryRepository = getCustomRepository(CountryRepository);
            const countryID = await countryRepository.findOne(id);

            if (countryID) {
                return response
                    .json({
                        success: true,
                        message: 'Lista dos Paises',
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