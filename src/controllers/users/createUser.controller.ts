import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { Person } from "../../models/Person";
import CreateUser, { ICreateUser } from "../../services/users/registerAdmin.service";

export default class CreateUserController{
    async handle(request: Request<ICreateUser>, response: Response<AppResponse<Person[]>>){
        try{
            const 
                createUserService = new CreateUser(),
                { ... phoneNumber } = request.body,
                createUser = await createUserService.execute({ ... phoneNumber });            
            if(createUser){
                return response.status(201)
                    .json({ success: true, message: 'Usuário Cadastrado!' });
            }
            return response.status(400)
                .json({ success: false, message: 'User not Created', data: createUser });
        }catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}
