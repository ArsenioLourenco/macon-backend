import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import AlterKey, { IAlterKey } from "../../services/users/alterKey.service";

export default class AlterkeyController{
    async handle(request: Request<IAlterKey>, response: Response<AppResponse<string>>){
        const { 
            id, 
            newKey, 
            confirmNewKey } = request.body;
        try{
            if(
                newKey != confirmNewKey
                ){
                return response
                    .json({
                        success: false,
                        message: 'The Keys not is equals',
                    })    
            }
            const alterkey = new AlterKey();
            await alterkey.execute({
                id, 
                newKey, 
                confirmNewKey
            });
            
            return response
                .status(200)
                .json({
                    success: true,
                    message: 'User Key Alter',
                })
        }catch(err){
            return response
                .json({
                    success: false,
                    message: 'User Not Alter',
                    data: err.message
                })
        }
    }
}