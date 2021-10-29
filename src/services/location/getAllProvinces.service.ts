import { getCustomRepository } from 'typeorm';
import ProvinceRepository from '../../repositories/province.repositoy';

export default class ProvincesService {
    async execute() {
        const provinceRepository = getCustomRepository(ProvinceRepository);
        try {
            const provinces = await provinceRepository.find();

            if (provinces) {
                const province = await provinceRepository
                    .createQueryBuilder()
                    .getMany();
                return province;
            }
        } catch (error) {
            return error
        }
    }
}