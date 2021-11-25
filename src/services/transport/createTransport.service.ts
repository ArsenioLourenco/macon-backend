
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
        let today = new Date()
        try{    
            const 
                transportRepository = getCustomRepository( TransportRepository ),
                typeTransportRepository = getCustomRepository( TypeTransportRepository ),
                verifyIfExistTypeTransport = await typeTransportRepository.findOne( typeTransport );

            const Transport = transportRepository.create({
                transportName,
                transportNumber,
                totalPlace,
                typeTransport: verifyIfExistTypeTransport,
                createdAt: today,
            });

            await transportRepository.save(
                Transport
            );
          return Transport;
        }
        catch (err) {
            return err.message;
        }
    }
}


