import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/users.repository";

export interface IUserDelete{
    id: number
}

export default class DeleteUser{
    async execute(id: number){
        const usersRepository = getCustomRepository(
            UsersRepository)
        try{
            const getIdProfile = await usersRepository.query(`
                SELECT * FROM Utilizadores WHERE id = ${id}
            `)
            const [{ id_perfil }] = getIdProfile;
            
            if(!getIdProfile) {
                return "This User not exist";   
            }
            if(id_perfil == 1){
                return 'This User can´t be deleted!'
            }
            const deleteUser = await usersRepository
                .createQueryBuilder()
                .delete()
                .where("id = :id", {id: id})
                .execute();
            
            return deleteUser;
        }
        catch(err){
            return err;
        }
      
    }

}