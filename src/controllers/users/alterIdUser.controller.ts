import {  Request, Response } from "express";
import { AppResponse } from "../../@types";
import AlterIdProfileUser, { IAlterProfile } from "../../services/users/alterIdUser.service";

export default class AlterIdUserControler{
    async handle(request:Request<IAlterProfile>, response: Response<AppResponse<string>>){
        try{
            const 
                { idUser, idProfile } = request.body,
                alterIdProfileUser = new AlterIdProfileUser(),
                updating = await alterIdProfileUser.execute({ 
                idUser, 
                idProfile
            });
            return response.status(200)
                .json({ success: true, data: updating });
        }
        catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
        }   
    }
}