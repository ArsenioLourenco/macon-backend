import { Request, Response } from "express";
import CreateTransport from "../../services/transport/createTransport.service";



export default class CreateTransportController{
    async handle(request:Request, response:Response){
        
        try{
            const createTransportController= new CreateTransport();
            const {transportName, transportNumber, totalPlace, typeTransportId}= request.body;
            const createTransport = await createTransportController.execute(
                 {transportName, transportNumber, totalPlace, typeTransportId
            })

            if(createTransport){
                return response.status(200)
                    .json({
                        success: true,
                        message: 'Transport Was Created',
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
        return err;
        

       }

    }
}