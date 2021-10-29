import { getCustomRepository } from 'typeorm';
import SpotRepository from '../../repositories/spot.repository';

export interface ISpotsProvince {
    id: number
}
export default class SpotsProvinceService {
    async execute({id}: ISpotsProvince) {
        const spotRepository = getCustomRepository(SpotRepository);
        try {

            const spots = spotRepository.find({where:{province:id}, relations: ['province']});
            return spots;
            
        } catch (error) {
            return error
        }
    }
}