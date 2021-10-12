import { Request, Response } from "express";
import { AppResponse } from "../@types";
import { Utilizadores } from "../models/Utilizadores";
import CreateUser, { ICreateUser } from "../services/createUser.service";

export default class CreateUserController{
    async handle(request: Request<ICreateUser>, response: Response<AppResponse<Utilizadores[]>>){
        try{
            const createUserService = new CreateUser();

            const { 
                username, 
                password, 
                email, 
                profileId } = request.body;
            
            const createUser = await createUserService.execute({ 
                username, 
                password, 
                email, 
                profileId 
            });
            
            if(createUser){
                return response.status(200)
                    .json({
                        success: true,
                        data: createUser
                    });
            }
              return response.status(200)
                    .json({
                        success: false,
                        message: 'Fatal Error',
                        data: createUser
                    });
                
        }catch(err){
            return response
                .json({
                    success: false,
                    message: err.message
                })
        }
    }
}
