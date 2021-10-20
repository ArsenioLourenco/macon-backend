import { getCustomRepository } from "typeorm";
import SpotRepository from "../../repositories/spots.repository";
import TransportRepository from "../../repositories/transports.repository";
import TravelsRepository from "../../repositories/travels.repository";




interface IcreateTravels{
    spotId: number,
    origin: number,
    destiny: number,
    departureDate: Date,
    returnDate: Date,
   timeToGoTo: Date,
   timeToArrival: Date,
   transportId: number,
   obervations: string
}

export default class CreateTravels{
    async execute({
        spotId, 
        origin, 
        destiny, 
        departureDate, 
        returnDate, 
        timeToGoTo, 
        timeToArrival, 
        transportId, 
        observations
    }){
        const travelsRepository= getCustomRepository(TravelsRepository)
        const sportRepository= getCustomRepository(SpotRepository)
        const transportRepository= getCustomRepository(TransportRepository)
        try{
            const verifyIfExistTravels= await travelsRepository.findOne( )
            if(verifyIfExistTravels){
                return 'this trip has already been booked'; 
            } 
            const verifyIdExistSport= await sportRepository.findOne(spotId)
            if(verifyIdExistSport){
                const verifyIdExistTransport= await transportRepository.findOne(transportId)
                if(verifyIdExistTransport){
                    const travels= await travelsRepository.create({
                        spot: verifyIdExistSport,
                        origin,
                        destiny,
                        departureDate,
                        returnDate,
                        timeToGoTo,
                        timeToArrival,
                        observations
                    })
                } else {return 'this transport not exist'}
            }
            else {return 'this spot not exist'}
           

            
            


        } 
        
        catch(err){
         return err;
        }
        
    }
}