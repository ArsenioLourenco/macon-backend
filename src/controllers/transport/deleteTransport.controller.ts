
import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import DeleteTransport from '../../services/transport/deleteTransport.service';

interface IDeleteTransport{
    id: number
}

export default class DeleteTransportController{
    async handle(request: Request<IDeleteTransport>, response: Response<AppResponse<String>>){
        const id = request.params.id;
        const deleteTransport = new DeleteTransport;
        try{
            const deleteTransportId = await deleteTransport.execute(
                id
            );
            return response.status(200)
                .json({
                    success: true,
                    message: 'Transport deleted',
                    data: deleteTransportId
                })
        }catch(err){
            return response.status(400)
                .json({
                    success: false,
                    message: err.message
                })
        }
    }
}