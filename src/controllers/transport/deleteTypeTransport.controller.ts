import { Request, Response } from "express";
import { AppResponse, IDelete } from "../../@types";
import DeleteTypeTransport from "../../services/transport/deleteTypeTransport.service";

export default class DeleteTypeTransportController{
    async handle(request: Request<IDelete>, response: Response<AppResponse<string>>){
        try{
            const deleteTypeTransport = new DeleteTypeTransport(),
                id = Number( request.params.id ),
                typeTransports = await deleteTypeTransport.execute( id )
             if(typeTransports){
                return response.status(200)
                .json({ success: true, message:"Modelo de Transporte Removido com Sucesso!", data: typeTransports});
             }
             else{
                return response.status(200)
                .json({ success: true, message:"Esse tipo de transporte não Existe"});
             }
            
        }catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}