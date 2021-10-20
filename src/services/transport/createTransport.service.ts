import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/transports.repository";
import TypeTransportRepository from "../../repositories/typeTransport.repository";

export interface ICreateTransport{
    transportName: string,
    transportNumber: number,
    totalPlace: number,
    typeTransportId: number
}

export default class CreateTransport{
    async execute({
        transportName, 
        transportNumber, 
        totalPlace, 
        typeTransportId } : ICreateTransport){
        
        const transportRepository= getCustomRepository(
            TransportRepository
        )
        const typeTransportRepository = getCustomRepository(
            TypeTransportRepository
        );
        try{
            const alreadyExistsTransportNumber = await transportRepository.findOne(
                transportNumber
            );


            if(alreadyExistsTransportNumber){
                return 'This Transport Already exists!';
            }
            
            const verifyIfExistTypeTransport = await typeTransportRepository.findOne(
                typeTransportId
            );

            if(!verifyIfExistTypeTransport){
                return 'We dont have this type transport!';
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

            return createTransport;
        }
        catch(err){
            return err.message;
        }
    } 
}