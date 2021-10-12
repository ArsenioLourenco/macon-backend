import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import UsersRepository from '../repositories/users.repository';
import { AppResponse } from '../@types';
import { Utilizadores } from '../models/Utilizadores';

export default class FindAllUsersController{
    async handle(request: Request, response: Response<AppResponse<Utilizadores[]>>){
        try{
            const userRepository = getCustomRepository(UsersRepository);

            const getAllUsers = await userRepository.find();

            if(getAllUsers){
                return response
                    .status(200)
                    .json({
                        success: true,
                        message: 'All Users',
                        data: getAllUsers
                    });
            }
            else
            {
                return response
                    .json({
                        success: false,
                        message: 'Table Users void'
                    });
            }
        }catch(err){
            return err;
        }
    }
}