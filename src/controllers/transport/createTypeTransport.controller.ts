import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { TypeTransport } from "../../models/TypeTransport";
import CreateTypeTransport, { ICreateTypeTransport } from "../../services/transport/createTypeTransport.service";

export default class CreateTypeTransportController{
    async handle(request: Request<ICreateTypeTransport>, response: Response<AppResponse<TypeTransport[]>>){
        try{
            const 
                createTypeTransportController = new CreateTypeTransport(),
                { 
                    typeName, 
                    description 
                } = request.body,
                creating = await createTypeTransportController.execute({
                    typeName, 
                    description
                });
            return response.status(201)
                .json({ success: true, data: creating });
        }
       catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
       }
    }
}