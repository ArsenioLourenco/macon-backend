import { Users } from './../../models/Users';
import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import DeleteUser, { IUserDelete } from "../../services/users/deleteUser.service";

export default class DeleteUserController{
    async handle(
        request: Request<IUserDelete>, 
        response: Response<AppResponse<Users>>){
        
        try{
            const id = request.params.id;
            const deleteUser = new DeleteUser();
            const deleteUserById = await deleteUser.execute(id);
            return response.status(200)
                .json({
                    success: true,
                    data: deleteUserById
                })
        }catch(err){
            return response
                .json({
                    success: false,
                    message: err.message
                })
        }
    }
}