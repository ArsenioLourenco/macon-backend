import { Request, Response } from "express";
import CreateTypeTransport from "../../services/transport/createTypeTransport.service";





export default class CreateTypeTransportController{
    async handle(request:Request, response:Response){
        
        try{
            const createTypeTransportController= new CreateTypeTransport();
            const {typeName, description}= request.body;
            const createTypeTransport = await createTypeTransportController.execute({
                typeName, description
            })

            if(createTypeTransport){
                return response.status(200)
                    .json({
                        success: true,
                        data: createTypeTransport
                    });

            } else {
                return response.status(200)
                .json({
                    success: false,
                    message: 'Fatal Error',
                    data: createTypeTransport
                });

            }
        }
       catch(err){
        return err;
        

       }

    }
}