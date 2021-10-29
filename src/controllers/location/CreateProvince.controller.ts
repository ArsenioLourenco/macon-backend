import { Request, Response } from 'express';
import { AppResponse, ICreateProvince } from '../../@types';
import { Provinces } from '../../models/Provinces';
import CreateProvinceService from '../../services/location/createProvince.service';
export default class CreateProvinceController {
    async handle(request: Request<ICreateProvince>, response: Response<AppResponse<Provinces[]>>) {
       
        try {
            const { name, region, code, country } = request.body;
            const serviceCreateProvince = new CreateProvinceService();
            const createProvince = await serviceCreateProvince.execute({name, region, code, country });
    
            if (createProvince) {
                return response.json({
                    success: true,
                    message: name + ' created successfully',
                    data: createProvince
                });
            } else {
                return response
                    .json({
                        success: false,
                        message: name + ' Ja existe na BD',
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