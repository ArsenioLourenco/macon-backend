import { getCustomRepository } from "typeorm";
import ProfileUserRepository from "../repositories/profileUsers.repository";
import UsersRepository from "../repositories/users.repository";

export interface IAlterProfile{
    idUser: number;
    idProfile: number;
}

export default class AlterIdProfileUser{
    async execute({ idUser, idProfile } : IAlterProfile ){
        const usersRepository = getCustomRepository(
            UsersRepository
        );
        const profileRepository = getCustomRepository(
            ProfileUserRepository
        );
        const verifyExistId = await usersRepository.findOne(
            {
                where: {
                    id: idUser
                }
            }
        );
        try{
            if(!verifyExistId){
                return 'This User Not Exists';
            }
            const verifyExistProfile = await profileRepository.findOne(
                idProfile
            );
            if(!verifyExistProfile){
                return 'This Profile Not Exists';
            }
                await usersRepository.query(`UPDATE Utilizadores SET id_perfil = ${idProfile} WHERE id = ${idUser}`);   
                return 'Perfil Alterado';       
        }
        catch(e){
            return e.message;
        }
    }
}
