
import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import DeleteTypeTransport from "../../services/transport/deleteTypeTransport.service";


export default class DeleteTypeTransportController{
    async handle(request: Request, response: Response<AppResponse<string>>){
        
        try{
            const id = Number(request.params.id);
            const deleteTypeTransport = new DeleteTypeTransport()
            const deleteTypeTransportId = await deleteTypeTransport.execute(id);
            return response.status(200)
                .json({
                    success: true,
                    message: ' Type Transport was deleted',
                    data: deleteTypeTransportId,
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