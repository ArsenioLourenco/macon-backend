import { hash } from 'bcryptjs'
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/users.repository";
import ProfileUserRepository from "../repositories/profileUsers.repository";

export interface ICreateUser{
    username: string,
    password: string,
    email: string,
    profileId: number
}

export default class CreateUser {
    async execute({ 
        username, 
        password, 
        email,
        profileId 
        } : ICreateUser){
            const usersRepository = getCustomRepository(
                UsersRepository
            ),
            profileUser = getCustomRepository(
                ProfileUserRepository
            );

            try{
                if(!email || !username || !password || !profileId){
                    return 'Please Send all datas'
                }
                const alreadyExistUser = await usersRepository.findOne({where: {
                    emailUtilizador: email
                }});

                if(alreadyExistUser){
                    return 'User Already exists';
                }
                else
                {
                    const existProfileId = await profileUser.findOne(
                        profileId
                    );

                    if(!existProfileId)
                    {
                        throw new Error('This Profile not exists');
                    }
                    else
                    {
                        //hashing password
                        const passwordCript = await hash(password, 8);

                        //converting name to Array
                        const ArrayName = username.split(' '),
                            firstName = ArrayName.shift(),
                            lastName = ArrayName[ArrayName.length - 1],
                            newName = (firstName+'.'+lastName).toLowerCase(),
                            latters = (firstName[0]+lastName[0]).toUpperCase();
                        
                        //getting lastMax id
                        const lastMaxId  = await usersRepository
                            .createQueryBuilder("users")
                            .select("MAX(users.id)", "max")
                            .getRawOne();

                        const newIdUser = parseInt(lastMaxId['max'] + 1).toString();
                        
                        // Formula da Felicidade
                        const zerosLeft = '0000';
                        const remainingZeros = zerosLeft.substring(0, (zerosLeft.toString().length - newIdUser.toString().length));

                        // Gerando CodeUser    
                        const newIdUseCode = 'BSOL'+remainingZeros+newIdUser+latters;
                        
                        const createUser = usersRepository.create({
                            nomeUtilizador: newName,
                            senhaUtilizador: passwordCript,
                            emailUtilizador: email,
                            idUtilizador: newIdUseCode,
                            idPerfil: existProfileId
                        });

                        await usersRepository.save(
                            createUser
                        );
                        return createUser; 
                    }
                }
            }catch(err){
                return err;
            }
    }
}