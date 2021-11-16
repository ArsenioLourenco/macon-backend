import { getCustomRepository } from "typeorm";
import TypeTransportRepository from "../../repositories/typeTransport.repository";

export interface ICreateTypeTransport{
    typeName: string,
    description: string
}
export default class CreateTypeTransport{
    async execute({ typeName, description } : ICreateTypeTransport){
        let today = new Date()
        try{
            const 
                typeTransportRepository = getCustomRepository( TypeTransportRepository ), 
                verifyIfExistTypeTransport = await typeTransportRepository.findOne({ where: { typeName } });
            if(verifyIfExistTypeTransport){
                return 'Já Existe um transporte Semelhante a Esse!';
            }
            const creating = typeTransportRepository.create({
                typeName,
                description,
                createdAt: today,
            });
            return await typeTransportRepository.save(
                creating
            );
        }
        catch(err){
            return err.message
        }
    } 
}