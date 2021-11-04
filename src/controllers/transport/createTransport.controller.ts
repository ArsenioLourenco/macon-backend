import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { Transport } from "../../models/Transport";
import CreateTransport, { ICreateTransport } from "../../services/transport/createTransport.service";

export default class CreateTransportController{
    async handle(request:Request<ICreateTransport>, response:Response<AppResponse<Transport[]>>){
        try{
            const 
                createTransportController = new CreateTransport(),
                { ... typeTransport } = request.body, 
                creating = await createTransportController.execute({ ... typeTransport });
            return response.status(201)
                .json({ success: true, data: creating });
        }
        catch(err){
            return response.status(500)
                .json({ success: false, message: err.message});
        }
    }
}