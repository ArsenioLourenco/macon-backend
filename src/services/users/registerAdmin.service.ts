import { hash } from 'bcryptjs'
import { getCustomRepository } from "typeorm";
import UsersRepository from "../../repositories/users.repository";
import ProfileRepository from '../../repositories/profile.repository';
import PersonRepository from '../../repositories/person.repository';
import axios from 'axios';

export interface ICreateUser{
    BI: string,
    password: string,
    email?: string,
    profileId: number,
    phoneNumber: string
}

export default class CreateUser {
    async execute({ 
        BI, 
        password, 
        email,
        profileId,
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
                if(!email || !BI || !password || !profileId){
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
                            id: profileId
                        }
                    })

                    if(!existProfileId)
                    {
                        throw new Error('This Profile not exists');
                    }
                    const verifyExistsBI = await personRepository.findOne({
                        where: {
                            bi: BI
                        }
                    });
                    if(verifyExistsBI){
                        return 'This BI already Register'
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
                    
                        //converting name to Array
                        const 
                            username = (FIRST_NAME+'.'+LAST_NAME[0]).toLowerCase(),
                            latters = (FIRST_NAME[0]+LAST_NAME[0]).toUpperCase();
                        
                        //getting lastMax id
                        const lastMaxId  = await usersRepository
                            .createQueryBuilder("users")
                            .select("MAX(Users.id)", "max")
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
                            email,
                            profile: existProfileId
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
                            return saveUser;
                        }
                        return createUser; 
                    }
                }
            }
            catch(err){
                return err;
        }
    }
}