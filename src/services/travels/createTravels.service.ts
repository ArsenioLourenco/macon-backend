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
   typeTransportId: number,
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
        typeTransportId, 
        observations
    }){
        const travelsRepository= getCustomRepository(TravelsRepository)
        const sportRepository= getCustomRepository(SpotRepository)
        //const transportRepository= getCustomRepository(TransportRepository)
        try{
            const verifyIfExistTravels= await travelsRepository.findOne()
            if(verifyIfExistTravels){
                return 'this trip has already been booked'; 
            } 
            const verifyIdExistSport= await sportRepository.findOne()
            if(!verifyIdExistSport){
                return ''
            }
            


        } 
        
        catch(err){

        }
        
    }
}