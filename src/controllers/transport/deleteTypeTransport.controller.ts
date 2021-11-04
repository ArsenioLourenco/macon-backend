import { Request, Response } from "express";
import { AppResponse, IDelete } from "../../@types";
import DeleteTypeTransport from "../../services/transport/deleteTypeTransport.service";

export default class DeleteTypeTransportController{
    async handle(request: Request<IDelete>, response: Response<AppResponse<string>>){
        try{
            const deleteTypeTransport = new DeleteTypeTransport(),
                id = Number( request.params.id ),
                deleting = await deleteTypeTransport.execute( id )
             
            return response.status(200)
                .json({ success: true, message:  deleting });
        }catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}