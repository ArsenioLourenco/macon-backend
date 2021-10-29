import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/Transport";
import TypeTransportRepository from "../../repositories/typeTransport.repository";

export interface ICreateTransport{
    transportName: string,
    transportNumber: number,
    totalPlace: number,
    typeTransport: number
}

export default class CreateTransport{
    async execute({
        transportName, 
        transportNumber, 
        totalPlace, 
        typeTransport } : ICreateTransport)
    {
        try{    
            const 
                transportRepository = getCustomRepository( TransportRepository ),
                typeTransportRepository = getCustomRepository( TypeTransportRepository ),
                alreadyExistsTransportNumber = await transportRepository.findOne( { where: { transportNumber } });

            if(alreadyExistsTransportNumber){
                return 'Não é permitido a duplicação de Autocarros';
            }

            const verifyIfExistTypeTransport = await typeTransportRepository.findOne( typeTransport );

            if(!verifyIfExistTypeTransport){
                return 'Não temos esse modelo de Autocarro!';
            }

            const createTransport = transportRepository.create({
                transportName,
                transportNumber,
                totalPlace,
                typeTransport: verifyIfExistTypeTransport
            });

            await transportRepository.save(
                createTransport
            );

            return [createTransport, 'Autocarro Registrado.'];
        }
        catch(err){
            return err.message;
        }
    } 
}


