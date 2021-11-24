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
            let today = new Date()
        try {
            const 
                travelsRepository   = getCustomRepository( TravelsRepository ),
                spotRepository      = getCustomRepository( SpotRepository ),
                transportRepository = getCustomRepository( TransportRepository ),
                provincesRepository = getCustomRepository( ProvincesRepository ),
                verifyIdSpots       = await spotRepository.findOne({ where: { id: spotId } }),
                verifyIdTransport   = await transportRepository.findOne({ where: { id: transportId } }),
                verifyIdProvinceOrigin  = await provincesRepository.findOne({ where: { id:  originProvince } }),
                verifyIdProvinceDestiny = await provincesRepository.findOne({ where: { id: destinyProvince } })
           
            if( verifyIdTransport){
                const Travels = await travelsRepository
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
                        price,
                        createdAt: today,
                    },
                ])
                .execute();
            return Travels;
            }
           
        }
        catch(err) {
            return err.message;
        }

    }
}