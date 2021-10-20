
import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import DeleteTransport from '../../services/transport/deleteTransport.service';


export default class DeleteTransportController{
    async handle(request: Request, response: Response<AppResponse<string>>){
        
        try{
            const id = Number(request.params.id);
            const deleteTransport = new DeleteTransport
            const deleteTransportId = await deleteTransport.execute(id);
            return response.status(200)
                .json({
                    success: true,
                    data: deleteTransportId,
                })
        }catch(err){
            return response
                .json({
                    success: false,
                    message: err.message
                })
        }
    }
}