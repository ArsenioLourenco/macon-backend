import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import UsersRepository from '../repositories/users.repository';
import { AppResponse } from '../@types';
import { Utilizadores } from '../models/Utilizadores';

interface IId{
    id: number
}

export default class FindUsersByIdController{
    async handle(request: Request<IId>, response: Response<AppResponse<Utilizadores[]>>){
        try{
            const id = request.params.id;
            const userRepository = getCustomRepository(
                UsersRepository
            );

            const getAllUsers = await userRepository.findOne(id);

            if(getAllUsers){
                return response
                    .status(200)
                    .json({
                        success: true,
                        message: 'User Exists',
                        data: getAllUsers
                    });
            }
            else
            {
                return response
                    .json({
                        success: false,
                        message: 'User not Exists'
                    });
            }
        }catch(err){
            return err;
        }
    }
}