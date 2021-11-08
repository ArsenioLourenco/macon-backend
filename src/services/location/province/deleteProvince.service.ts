import { getCustomRepository } from 'typeorm';
import ProvinceRepository from '../../../repositories/province.repositoy';

export interface IDeleteProvince { id: number }
export default class DeleteProvince {
    async execute({ id }: IDeleteProvince) {
        try {
            const provinceRepository = getCustomRepository(ProvinceRepository);
            const provinceID = provinceRepository.findOne(id);
            if (provinceID) {
                const deleteProvince = await provinceRepository
                    .createQueryBuilder()
                    .delete()
                    .where("id = :id", { id: id })
                    .execute();
                return deleteProvince;
            }
        } catch (error) {
            return error;
        }
    }
}