import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppResponse } from '../../@types';
import { Provinces } from '../../models/Provinces';
import ProvinceRepository from '../../repositories/province.repositoy';
import ReadProvinceByID, { IReadProvinceByID } from '../../services/location/readProvinceByID.service';


export default class ReadProvinceByIDController {
    async handle(request: Request<IReadProvinceByID>, response: Response<AppResponse<Provinces[]>>) {
        try {
            const id = request.params.id;
            const serviceReadprovinceByID = new ReadProvinceByID();
            const provinceID = await serviceReadprovinceByID.execute({id})

            if (provinceID) {
                return response
                    .json({
                        success: true,
                        message: 'Informacao da Provincia',
                        data: provinceID
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