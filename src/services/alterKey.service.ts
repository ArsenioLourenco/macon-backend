import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/users.repository';

export interface IAlterKey{
    id: number,
    newKey: string,
    confirmNewKey: string
}

export default class AlterKey{
    async execute(
        {
            id,
            newKey,
            confirmNewKey
        } : IAlterKey
    ){
        const usersRepository = getCustomRepository(
            UsersRepository
        );
        try{
            const verifyExistId = await usersRepository.findOne({
                where: {
                    id
                }
            });
            if(!verifyExistId){
                return 'User not Exists';
            }
            if(newKey.length < 6){
                return 'Password too short'
            }

            if(!(newKey == confirmNewKey)){
                return 'The news keys not is smiles'
            }
            const newKeyCript = await hash(newKey, 8),
                alterKey = await usersRepository
                    .createQueryBuilder()
                    .update()
                    .set({
                        senhaUtilizador: newKeyCript
                    })
                    .where({
                        id
                    })
                    .execute();
            return alterKey;
        }catch(e){
            return e.message
        }
    }
}