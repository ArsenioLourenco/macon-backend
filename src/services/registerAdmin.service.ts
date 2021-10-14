import { hash } from 'bcryptjs'
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/users.repository";
import ProfileRepository from '../repositories/profile.repository';
import PersonRepository from '../repositories/person.repository';
import axios from 'axios';

export interface ICreateUser{
    BI: string,
    password?: string,
    email?: string,
    typeProfile: number,
    phoneNumber?: string
}

export default class CreateUser {
    async execute({ 
        BI, 
        password, 
        email,
        typeProfile,
        phoneNumber 
        } : ICreateUser){
           const usersRepository = getCustomRepository(
               UsersRepository
           );
           const profileRepository = getCustomRepository(
               ProfileRepository
           );
           const personRepository = getCustomRepository(
               PersonRepository
           )

            try{
                if(!email || !BI || !password || !typeProfile){
                    return 'Please Send all datas'
                }
                const alreadyExistUser = await usersRepository.findOne({
                    where: {
                        email
                    }
                })

                if(alreadyExistUser){
                    return 'User Already exists';
                }
                else
                {
                    const existProfileId = await profileRepository.findOne({
                        where: {
                            id: typeProfile
                        }
                    })

                    if(!existProfileId)
                    {
                        throw new Error('This Profile not exists');
                    }
                    else
                    {
                        const verifyBI = await axios.get(`
                            https://desenvolvimento.gov.ao/dev.api/bi/?bi=${BI}
                        `);
                        
                        if(!(verifyBI.status === 200)){
                            throw new Error('This BI not exists');
                        }
                        //hashing password
                        const passwordCript = await hash(password, 8);

                        // getting user BI datas
                        const [{ FIRST_NAME, LAST_NAME, BIRTH_DATE }] = verifyBI.data;
                        console.log(FIRST_NAME);
                        
                        //converting name to Array
                        const 
                            username = (FIRST_NAME+'.'+LAST_NAME).toLowerCase(),
                            latters = (FIRST_NAME[0]+LAST_NAME[0]).toUpperCase();
                        
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
                        const code = 'maconTrasp'+remainingZeros+newIdUser+latters;
                        
                        const createUser = usersRepository.create({
                            username,
                            code,
                            password: passwordCript,
                            email
                        });

                        const saveUser = await usersRepository.save(
                            createUser
                        );
                        if(saveUser){
                            // gettint id
                            const id = saveUser.id;
                            // saving Person Datas
                            const saveDatasInPerson = personRepository.create({
                                firstName: FIRST_NAME,
                                lastName: LAST_NAME,
                                completeName: FIRST_NAME + ' ' + LAST_NAME,
                                bi: BI,
                                birthDate: BIRTH_DATE,
                                userId: id,
                                phoneNumber
                            });
                            await personRepository.save(
                                saveDatasInPerson
                            );
                            return verifyBI.data;
                        }
                        return createUser; 
                    }
                }
            }catch(err){
                return err;
            }
    }
}