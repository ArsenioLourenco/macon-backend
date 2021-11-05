import { getCustomRepository } from "typeorm";
import ProvincesRepository from "../../repositories/provinces.repository";
import SpotRepository from "../../repositories/spots.repository";
import TransportRepository from "../../repositories/Transport";
import TravelsRepository from "../../repositories/travels.repository";

export interface IcreateTravels {
    departureDate: Date,
    returnDate?: Date,
    timeToGoTo: Date,
    timeToArrival: Date,
    observations?: string,
    spotId: number,
    originProvince: number,
    destinyProvince: number,
    transportId: number,
    price: number
}

export default class CreateTravels {
    async execute({ 
        departureDate, 
        returnDate, 
        timeToGoTo, 
        timeToArrival, 
        observations, 
        spotId, 
        originProvince, 
        destinyProvince, 
        transportId, 
        price }: IcreateTravels) {
        try {
            const 
                travelsRepository   = getCustomRepository( TravelsRepository ),
                spotRepository      = getCustomRepository( SpotRepository ),
                transportRepository = getCustomRepository( TransportRepository ),
                provincesRepository = getCustomRepository( ProvincesRepository ),
                verifyIdSpots       = await spotRepository.findOne({ where: { id: spotId } }),
                verifyIdTransport   = await transportRepository.findOne({ where: { id: transportId } }),
                verifyIdProvinceOrigin  = await provincesRepository.findOne({ where: { id:  originProvince } }),
                verifyIdProvinceDestiny = await provincesRepository.findOne({ where: { id: destinyProvince } }),
                findTravelsDeparture    = await travelsRepository.findOne({ 
                    where: { departureDate }, 
                    relations: ['transport', 'originProvince', 'destinyProvince'] 
                });
            
            if (findTravelsDeparture) {
                const { id } = findTravelsDeparture.transport;
                if ( id === transportId ) {
                    return 'Esse Autocarro Já esta Escalado Para esse Dia!';
                }
            }

            if (verifyIdProvinceOrigin.id === verifyIdProvinceDestiny.id) {
                return 'Erro: Verifique Se esta mandando os Dados correctamente';
            }
            
            const creating = await travelsRepository
                .createQueryBuilder()
                .insert()
                .values([
                    {
                        departureDate,
                        returnDate,
                        timeToGoTo,
                        timeToArrival,
                        observations,
                        spot: verifyIdSpots,
                        originProvince: verifyIdProvinceOrigin,
                        destinyProvince: verifyIdProvinceDestiny,
                        transport: verifyIdTransport,
                        price
                    },
                ])
                .execute();
            return creating;
        }
        catch(err) {
            return err.message;
        }

    }
}