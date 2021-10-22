import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import { Spots } from '../../models/Spots';
import CreateSpot, {ICreateSpot} from '../../services/location/createSpot.service';
export default class CreateSpotController {
    async handle(request: Request<ICreateSpot>, response: Response<AppResponse<Spots[]>>) {
       
        try {
            const { name, description, location, contacts, provinceID } = request.body;
            const serviceSpot = new CreateSpot();
            const createSpot = await serviceSpot.execute({ name, description, location, contacts, provinceID });
    
            if (!createSpot) {
                return response.json({
                    success: true,
                    message: name + ' created successfully',
                    data: createSpot
                });
            } else {
                return response
                    .json({
                        success: false,
                        message: 'Nao criou...' + name,
                        data: createSpot
                    })
            }

        } catch (error) {
            return response
                .json({
                    success: false,
                    message: 'Erro ao criar um ponto ' + error.message
                })
        }
    }
}