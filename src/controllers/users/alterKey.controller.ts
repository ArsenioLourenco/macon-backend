import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import AlterKey, { IAlterKey } from "../../services/users/alterKey.service";

export default class AlterkeyController{
    async handle(request: Request<IAlterKey>, response: Response<AppResponse<string>>){
        try{
            const 
                { id, newKey, confirmNewKey } = request.body,
                alterkey = new AlterKey();
            if( newKey != confirmNewKey ){
                return response.status(400)
                    .json({ success: false, message: 'As palavras Passe não são iguais!' });    
            }
            await alterkey.execute(
                { id, newKey, confirmNewKey }
            );
            
            return response
                .status(200)
                .json({ success: true, message: 'Palavra Passe alterada!' });
        }catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}