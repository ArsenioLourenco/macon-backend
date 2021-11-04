import { Users } from './../../models/Users';
import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import UpdateUser,  { IUpdate } from "../../services/users/updateUser.service";

export class UpdateUserController {
    async handle(request: Request<IUpdate>, response: Response<AppResponse<Users[]>>) {
        try {
            const updateUserService = new UpdateUser();
            const UpdateUserService = await updateUserService.execute(request.body);
            return response.status(200)
                .json({ success: true, data: UpdateUserService });
        } catch (err) {
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}