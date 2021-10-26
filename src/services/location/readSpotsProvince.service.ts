import { getCustomRepository } from 'typeorm';
import ProvinceRepository from '../../repositories/province.repositoy';
import SpotRepository from '../../repositories/spot.repository';

export interface IReadSpotsProvince {
    id: number
}
export default class ReadSpotsProvince {
    async execute({id}: IReadSpotsProvince) {
        const spotRepository = getCustomRepository(SpotRepository);
        const provinceRepository = getCustomRepository(ProvinceRepository);
        try {
            const spot = await spotRepository.find();
            const province = await provinceRepository.findOne(id);
            if (spot) {
                const spots = await spotRepository
                    .createQueryBuilder()
                    .where("id = :id", { id: province})
                    .getOne();
                    return spots;
            }
        } catch (error) {
            return error
        }
    }
}