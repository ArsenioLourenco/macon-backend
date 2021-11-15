import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../../repositories/users.repository';

export interface ILogin {
    email: string,
}

export default class Login {
    async execute({ email }: ILogin) {

        const userRepository = getCustomRepository(
            UsersRepository
        );
        try {
            const verifyUserExist = await userRepository.findOne({
                where: {
                    email
                }
            });

            if (verifyUserExist) {
                return verifyUserExist;
            }
        } catch (err) {
            return err.message;
        }
    }
}