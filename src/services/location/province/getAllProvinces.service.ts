import { getCustomRepository } from 'typeorm';
import ProvinceRepository from '../../../repositories/province.repositoy';
export interface IProvince{
    id: number
}
export default class ProvincesService {
    async execute({ id }: IProvince) {
        try {

            const provinceRepository = getCustomRepository(ProvinceRepository);
            const provinces = await provinceRepository.find({ where: {country: id, deletedAt: null}, relations: ['country']});

            if (provinces) {
                return provinces;
            }
        } catch (error) {
            return error
        }
    }
}