import {Request, Response} from 'express';
import { AppResponse } from '../../@types';
import { Provinces } from '../../models/Provinces';
import DeleteProvince, { IDeleteProvince } from '../../services/location/deleteProvince.service';



export default class DeleteProvinceController{
    async handle(request: Request<IDeleteProvince>, response: Response<AppResponse<Provinces>>){
        try {
            const id = request.params.id;
            const serviceCountry = new DeleteProvince();
            const deleteCountry = await serviceCountry.execute({id});
            
            if(deleteCountry){
                return response
                .json({
                    success: true,
                    message: 'Provincia removido da Base de dados',
                    data: deleteCountry
                })
            }else{
                return response
            .json({
                success: false,
                message: 'Falha ao deletar o Provincia',
            });
            }
            
        } catch (error) {
            return response
            .json({
                success: false,
                message: 'Erro ao deletar o Provincia, ' + error.message,
            });
        }
    }
}