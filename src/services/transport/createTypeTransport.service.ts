import { getCustomRepository } from "typeorm";
import TypeTransportRepository from "../../repositories/typeTransport.repository";

export interface ICreateTypeTransport {
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
            if (!verifyIfExistTypeTransport) {
                const typeTransport = typeTransportRepository.create({
                    typeName,
                    description
                });
                return await typeTransportRepository.save(
                    typeTransport
                );
            }
            const typeTransport = typeTransportRepository.create({
                typeName,
                description,
                createdAt: today,
            });
            return await typeTransportRepository.save(
                typeTransport
            );
        }
        catch (err) {
            return err.message
        }
    }
}