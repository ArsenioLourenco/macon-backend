import { getCustomRepository, getRepository } from "typeorm";
import { hash } from 'bcryptjs'
import UsersRepository from "../repositories/users.repository";


export interface IUpdate {
    id: number,
    username: string,
    email: string
}

export default class Update {
    async execute({
        id,
        username,
        email,

    }: IUpdate) {

        const usersRepository = getCustomRepository(
            UsersRepository
        );

        try {
            const verifyUserId = await usersRepository.findOne({
                where: {
                    id: id
                }
            });

            console.log("ID: " + id)
            console.log("Email: " + email)

            if (verifyUserId) {
                if (username && email) {

                    const ArrayName = username.split(' '),
                        firstName = ArrayName.shift(),
                        lastName = ArrayName[ArrayName.length - 1],
                        newName = (firstName + '.' + lastName).toLowerCase(),
                        latters = (firstName[0] + lastName[0]).toUpperCase();

                    console.log("Username: " + newName)

                    const zerosLeft = '0000';
                    const remainingZeros = zerosLeft.substring(0, (zerosLeft.toString().length - id.toString().length));

                    const newCodeUpdate = 'BSOL' + remainingZeros + id + latters;

                    console.log("ID Utilizador: " + newCodeUpdate)
                    console.log("ID: " + id)

                    const userUpdate = await usersRepository
                        .createQueryBuilder()
                        .update()
                        .set({ username: newName, email, code : newCodeUpdate })
                        .where("id = :id", { id: id })
                        .execute();
                    return userUpdate;
                } else if (username && !email) {
                    const ArrayName = username.split(' '),
                        firstName = ArrayName.shift(),
                        lastName = ArrayName[ArrayName.length - 1],
                        newName = (firstName + '.' + lastName).toLowerCase(),
                        latters = (firstName[0] + lastName[0]).toUpperCase();

                    console.log("Username: " + newName)

                    const zerosLeft = '0000';
                    const remainingZeros = zerosLeft.substring(0, (zerosLeft.toString().length - id.toString().length));

                    const newCodeUpdate = 'BSOL' + remainingZeros + id + latters;

                    console.log("ID Utilizador: " + newCodeUpdate)

                    const userUpdate = await usersRepository
                        .createQueryBuilder()
                        .update()
                        .set({ username: newName, code: newCodeUpdate })
                        .where("id = :id", { id: id })
                        .execute();
                    return userUpdate;
                } else if(!username && email){
                    const userUpdate = await usersRepository
                        .createQueryBuilder()
                        .update()
                        .set({email})
                        .where("id = :id", { id: id })
                        .execute();
                   return userUpdate;
                }
            }
            else {
                return 'This user not Exists'
            }
        } catch (err) {
            return err;
        }
    }
}