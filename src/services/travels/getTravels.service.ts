import { getCustomRepository } from "typeorm";
import TravelsRepository from "../../repositories/travels.repository";
export interface IGetTravel {
    originProvince: number,
    destinyProvince: number,
    departureDate: Date,
    returnDate?: Date
}
export default class GetTravels {
    async execute({ originProvince, destinyProvince, departureDate, returnDate }: IGetTravel) {
        const travelsRepository = getCustomRepository(TravelsRepository)
        try {
            const travel = travelsRepository.find({ where: { originProvince, destinyProvince, departureDate, returnDate, deletedAt: null } })
            return travel;
        } catch (e) {

        }
    }


}