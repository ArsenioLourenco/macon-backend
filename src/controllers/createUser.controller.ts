import { Request, Response } from "express";
import { AppResponse } from "../@types";
import { Person } from "../models/Person";
import CreateUser, { ICreateUser } from "../services/registerAdmin.service";

export default class CreateUserController{
    async handle(request: Request<ICreateUser>, response: Response<AppResponse<Person[]>>){
        try{
            const createUserService = new CreateUser();

            const { 
                BI, 
                password, 
                email, 
                typeProfile,
                phoneNumber } = request.body;
            
            const createUser = await createUserService.execute({ 
                BI, 
                password, 
                email, 
                typeProfile,
                phoneNumber 
            });

            console.log(createUser)
            
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
                        message: 'User not Created',
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
