import { getCustomRepository } from 'typeorm';
import ProvinceRepository from '../../repositories/province.repositoy';
import SpotRepository from '../../repositories/spot.repository';

export interface IReadSpotsProvince {
    id: number
}
export default class ReadSpotsProvince {
    async execute({id}: IReadSpotsProvince) {
        const spotRepository = getCustomRepository(SpotRepository);
        try {

            const province = spotRepository.find({where:{provinceID:id}});
            return province;
            
        } catch (error) {
            return error
        }
    }
}