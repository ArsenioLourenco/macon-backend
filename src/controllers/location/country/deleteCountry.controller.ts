import {Request, Response} from 'express';
import { AppResponse } from '../../../@types';
import { Countries } from '../../../models/Countries';
import DeleteCountry, { IDeleteCountry } from '../../../services/location/country/deleteCountry.service';
export default class DeleteCountryController{
    async handle(request: Request<IDeleteCountry>, response: Response<AppResponse<Countries>>){
        try {
            const id = request.params.id;
            const serviceCountry = new DeleteCountry();
            const deleteCountry = await serviceCountry.execute({id});
            if(deleteCountry){
                return response
                .json({
                    success: true,
                    message: 'Pais removido da Base de dados',
                    data: deleteCountry
                })
            }else{
                return response
            .json({
                success: false,
                message: 'Falha ao deletar o Pais'
            });
            }
            
        } catch (error) {
            return response
            .json({
                success: false,
                message: 'Erro ao deletar o Pais, ' + error.message,
            });
        }
    }
}