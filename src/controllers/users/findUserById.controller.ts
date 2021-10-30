import { Users } from './../../models/Users';
import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import UsersRepository from '../../repositories/users.repository';
import { AppResponse } from '../../@types';

interface IId{
    id: number
}
export default class FindUsersByIdController{
    async handle(request: Request<IId>, response: Response<AppResponse<Users[]>>){
        try{
            const 
                id = request.params.id,
                userRepository = getCustomRepository( UsersRepository ),
                getAllUsers = await userRepository.findOne(id);
            if(getAllUsers){
                return response.status(200) 
                    .json({ success: true, data: getAllUsers });
            }
            return response.status(500)
                .json({ success: false, message: 'Verifique se está mandando o ID correcto.' });
        }catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}