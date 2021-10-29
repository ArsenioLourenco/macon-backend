import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { Transport } from "../../models/Transport";
import CreateTransport, { ICreateTransport } from "../../services/transport/createTransport.service";


export default class CreateTransportController{
    async handle(request:Request<ICreateTransport>, response:Response<AppResponse<Transport[]>>){
        const createTransportController = new CreateTransport();
        
        const { 
            transportName, 
            transportNumber, 
            totalPlace, 
            typeTransportId } = request.body; 

        try{
            const createTransport = await createTransportController.execute({ 
                transportName, 
                transportNumber, 
                totalPlace, 
                typeTransportId
            });
          
            if(createTransport){
                return response.status(200)
                    .json({
                        success: true,
                        data: createTransport
                    });

            } else {
                return response.status(200)
                .json({
                    success: false,
                    message: 'Fatal Error',
                    data: createTransport
                });

            }
        }
       catch(err){
            return err.message;
       }

    }
}