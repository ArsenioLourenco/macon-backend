import { getCustomRepository } from "typeorm";
import TypeTransportRepository from "../../repositories/typeTransport.repository";

interface ICreateTypeTransport{
    typeName: string,
    description: string
}

export default class CreateTypeTransport{
    async execute({typeName, description}: ICreateTypeTransport){
        
        const typeTransportRepository = getCustomRepository(
            TypeTransportRepository
        )
        try{
            
            const verifyIfExistTypeTransport = await typeTransportRepository.findOne(
                {where:{
                     typeName
                }}
            );

            if(verifyIfExistTypeTransport){
                return 'this type Transport exist';
            }

            const createTypeTransport = typeTransportRepository.create({
                typeName,
                description
            });

            await typeTransportRepository.save(
                createTypeTransport
            );

            if(createTypeTransport){
                return createTypeTransport;
            }
            return 'Bug'
            
        }
        catch(err){
            return err.message
        }
    } 
}