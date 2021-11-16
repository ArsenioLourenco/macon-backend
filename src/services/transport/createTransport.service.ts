
import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/Transport";
import TypeTransportRepository from "../../repositories/typeTransport.repository";

export interface ICreateTransport {
    transportName: string,
    transportNumber: number,
    totalPlace: number,
    typeTransport: number
}

export default class CreateTransport {
    async execute({
        transportName,
        transportNumber,
        totalPlace,
        typeTransport }: ICreateTransport) {
            console.log(" transport é: " , typeTransport)
        try {
            const
                transportRepository = getCustomRepository(TransportRepository),
                typeTransportRepository = getCustomRepository(TypeTransportRepository),
                verifyIfExistTypeTransport = await typeTransportRepository.findOne({where:{id:typeTransport}});
               
                if (verifyIfExistTypeTransport) {
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
    
        
        }
        catch (err) {
            return err.message;
        }
    }
}


