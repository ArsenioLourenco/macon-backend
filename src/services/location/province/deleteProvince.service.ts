import { getCustomRepository } from 'typeorm';
import ProvinceRepository from '../../../repositories/province.repositoy';

export interface IDeleteProvince { id: number }
export default class DeleteProvince {
    async execute({ id }: IDeleteProvince) {
        let today = new Date()
        try {
            const provinceRepository = getCustomRepository(ProvinceRepository);
            const provinceID = provinceRepository.findOne(id);
            if ((await provinceID).deletedAt===null) {
                const deleteProvince = await provinceRepository
                    .createQueryBuilder()
                    .update()
                    .set({deletedAt: today})
                    .where("id = :id", { id: id })
                    .execute();
                return deleteProvince;
            }
        } catch (error) {
            return error;
        }
    }
}