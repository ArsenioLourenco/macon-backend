import { getCustomRepository } from "typeorm";
import { Tranpsort } from "../../models/Tranpsort";
import TransportRepository from "../../repositories/transports.repository";
import TypeTransportRepository from "../../repositories/typeTransport.repository";

interface ICreateTransport{
    transportName: string,
    transportNumber: number,
    totalPlace: number,
    typeTransportId: number
}

export default class CreateTransport{
    async execute({transportName, transportNumber, totalPlace, typeTransportId}: ICreateTransport){
        const transportRepository= getCustomRepository(
            TransportRepository
        )
        const typeTransportRepository = getCustomRepository(
            TypeTransportRepository
        )
        try{
            const readyTransport= await transportRepository.findOne(
                transportNumber
            )

            if(readyTransport){
                return 'Transport Already exists'
            }
            
            const verifyIfExistTypeTransport = await typeTransportRepository.findOne(
                typeTransportId
            );

            if(!verifyIfExistTypeTransport){
                return ' We dont have this transport';
            }

            const transportId = verifyIfExistTypeTransport.id

            // const transport = await transportRepository
            //     .query(`INSERT INTO Transport(transportName, transportNumber, totalPlaces, typeTransportId) VALUES (${transportName}, ${transportNumber}, ${totalPlace}, ${transportId})`);



            const createTransport = transportRepository.create({
                transportName,
                transportNumber,
                totalPlace,
                typeTransport: verifyIfExistTypeTransport
            });

            await transportRepository.save(
                createTransport
            );

            if(createTransport){
                return createTransport;
            }
            return 'Bug'
            //  const createTransport= transportRepository.create(
            //      {
            //          transportName,
            //          transportNumber: transportNumber,
            //         totalPlace: totalPlace,
            //          typeTransport: typeTransportId
            //      }
            //  )
        }
        catch(err){
            return err.message
        }
    } 
}