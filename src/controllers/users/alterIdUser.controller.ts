import {  Request, Response } from "express";
import { AppResponse } from "../../@types";
import AlterIdProfileUser, { IAlterProfile } from "../../services/users/alterIdUser.service";

export default class AlterIdUserControler{
    async handle(request:Request<IAlterProfile>, response: Response<AppResponse<string>>){
        try{
            const { idUser, idProfile } = request.body;
            const alterIdProfileUser = new AlterIdProfileUser();
            const a = await alterIdProfileUser.execute({ 
                idUser, 
                idProfile
            });

            return response.status(200)
            .json({
                success: true,
                data: a
            })
        }
        catch(err){
            return response
                .json({
                    success: false,
                    message: err.message
            });
        }   
    }
}