import { getCustomRepository } from 'typeorm';
import ProvinceRepository from '../../../repositories/province.repositoy';
export interface IProvince{
    id: number
}
export default class ProvincesService {
    async execute({ id }: IProvince) {
        try {

            const provinceRepository = getCustomRepository(ProvinceRepository);
            const provinces = await provinceRepository.find({ where: {country: id}, relations: ['country']});

            if (provinces) {
                const province = await provinceRepository
                    .createQueryBuilder()
                    .where("countryId = :countryId", { countryId: id })
                    .getMany();
                return province;
            }
        } catch (error) {
            return error
        }
    }
}