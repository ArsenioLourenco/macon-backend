import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import { Countries } from '../../models/Countries';
import CreateCountry, { ICreateCountry } from '../../services/location/createCountry.service';

export default class CreateCountryController {
    async handle(request: Request<ICreateCountry>, response: Response<AppResponse<Countries[]>>) {
        try {
            const { name, region, code } = request.body;
            const serviceCountry = new CreateCountry();
            const createCountry = await serviceCountry.execute({ name, region, code })

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
                        message: 'Nao criou... ' + name,
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