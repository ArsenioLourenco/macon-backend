import { Users } from './../../models/Users';
import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import UsersRepository from '../../repositories/users.repository';
import { AppResponse } from '../../@types';
import SendSMS from '../../services/sendSMS/sendSMS.service';

export default class FindAllUsersController{
    async handle(request: Request, response: Response<AppResponse<Users[]>>){
        try{
            const userRepository = getCustomRepository(UsersRepository);

            const getAllUsers = await userRepository.find();

            if(getAllUsers){
                // const smsService = new SendSMS();
                // const teste = await smsService.execute({contact: +244938172280, text: 'teste'}) 
                // console.log(teste.);
                
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