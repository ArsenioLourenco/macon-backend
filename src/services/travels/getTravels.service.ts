import { getCustomRepository } from "typeorm";
import TravelsRepository from "../../repositories/travels.repository";


export interface IGetTravel{
    originProvince: number,
    destinyProvince:number,
    departureDate:Date,
    returnDate?:Date
}




export default class GetTravels{
    async execute({originProvince, destinyProvince, departureDate, returnDate}:IGetTravel){
        const travelsRepository= getCustomRepository(TravelsRepository)
        try {
            const getTravel= travelsRepository.find({where:{originProvince, destinyProvince, departureDate, returnDate}})
            
                return getTravel;
            
        } catch (e) {
            
        }
    }
    

}