import {Request, Response} from 'express';
import { AppResponse } from '../../../@types';
import { Spots } from '../../../models/Spots';
import { IDeleteSpot } from '../../../services/location/spot/deleteSpot.service';
import DeleteSpot from '../../../services/location/spot/deleteSpot.service';
export default class DeleteSpotController{
    async handle(request: Request<IDeleteSpot>, response: Response<AppResponse<Spots>>){
        try {
            const id = request.params.id;
            const serviceCountry = new DeleteSpot();
            const deleteCountry = await serviceCountry.execute({id});
            if(deleteCountry){
                return response
                .json({
                    success: true,
                    message: 'Ponto removido da Base de dados',
                    data: deleteCountry
                })
            }else{
                return response
            .json({
                success: false,
                message: 'Falha ao deletar o Ponto',
            });
            }
            
        } catch (error) {
            return response
            .json({
                success: false,
                message: 'Erro ao deletar o Ponto, ' + error.message,
            });
        }
    }
}