
import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import DeleteTransport from '../../services/transport/deleteTransport.service';
import { IDelete } from "../../@types";

export default class DeleteTransportController{
    async handle(request: Request<IDelete>, response: Response<AppResponse<String>>){
    try{
        const 
            { id } = request.params,
            deleteTransportService = new DeleteTransport(),
            deleting = await deleteTransportService.execute( id );
            if(deleting){
                return response.status(200)
                .json({ success: true, message:"Transporte Removido com Sucesso!", data: deleting });
            }

            else{
                return response.status(400)
                .json({ success: false, message:"Este Transport não existe", data:deleting });
            }
        
    }catch(err){
        return response.status(500)
            .json({ success: false, message: err.message });
        }
    }
}