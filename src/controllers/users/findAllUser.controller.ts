import { Users } from './../../models/Users';
import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import UsersRepository from '../../repositories/users.repository';
import { AppResponse } from '../../@types';

export default class FindAllUsersController{
    async handle(request: Request, response: Response<AppResponse<Users[]>>){
        try{
            const 
                userRepository = getCustomRepository(UsersRepository),
                getAllUsers = await userRepository.find();
            if(getAllUsers){
                return response.status(200)
                    .json({ success: true, message: 'Todos os Usuários', data: getAllUsers });
            }
            return response.status(400)
                .json({ success: false, message: 'Não Tem Usuários Reistrados.' });
        }catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}