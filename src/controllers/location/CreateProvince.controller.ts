import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import { Provinces } from '../../models/Provinces';
import CreateProvince, { ICreateProvince } from '../../services/location/CreateProvince.service';
export default class CreateProvinceController {
    async handle(request: Request<ICreateProvince>, response: Response<AppResponse<Provinces[]>>) {
       
        try {
            const { name, region, code, countryID } = request.body;
            const serviceProvince = new CreateProvince();
            const createProvince = await serviceProvince.execute({name, region, code, countryID });
    
            if (!createProvince) {
                return response.json({
                    success: true,
                    message: name + ' created successfully',
                    data: createProvince
                });
            } else {
                return response
                    .json({
                        success: false,
                        message: 'Nao criou...' + name,
                        data: createProvince
                    })
            }

        } catch (error) {
            return response
                .json({
                    success: false,
                    message: 'Erro ao criar uma Provincia ' + error.message
                })
        }
    }
}