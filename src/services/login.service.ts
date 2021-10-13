import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/users.repository';

export interface ILogin{
    username: string,
    password: string
}

export default class Login{
    async execute({
        username,
        password
    } : ILogin){
        
        const userRepository =getCustomRepository(
            UsersRepository
        );
        try{
            const verifyUserExist = await userRepository.findOne({
                    where: {
                    username
                }
            });

            if(verifyUserExist){
                const userPassword = verifyUserExist['password'];
                const passwordCompare = await compare(
                    password, 
                    userPassword
                );
                
                if(!passwordCompare){
                    return 'Incorrect Username/Password';
                }
                const token = sign(
                    {
                        id: verifyUserExist.id, 
                        email: verifyUserExist.email, 
                    },
                        process.env.JWT_SECRET,
                );

                return token;
            }   
            else{
                return 'This user not Exists'
            }
        }catch(err){
            return err;
        }
    }
}