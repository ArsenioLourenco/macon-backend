import { Users } from './../../models/Users';
import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import UpdateUser,  { IUpdate } from "../../services/users/updateUser.service";


export class UpdateUserController {
    async handle(request: Request<IUpdate>, response: Response<AppResponse<Users[]>>) {
        try {
            const updateUserService = new UpdateUser();

            const {
                id,
                username,
                email,
            } = request.body;

            const UpdateUserService = await updateUserService.execute({
                id,
                username,
                email,
            });

            if(UpdateUserService){
                return response.status(200)
                    .json({
                        success: true,
                        data: UpdateUserService
                    });
            }

                return response.status(200)
                    .json({
                        success: true,
                        data: UpdateUser
                    });
            

        } catch (err) {
            return response
                .json({
                    success: false,
                    message: err.message
                })
        }
    }
}