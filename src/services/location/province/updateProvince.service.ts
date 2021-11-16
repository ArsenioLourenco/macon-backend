import { getCustomRepository } from 'typeorm';
import ProvinceRepository from '../../../repositories/province.repositoy';

export interface IUpdateProvince { id: number, name: string, region: string, code: string }
export default class UpdateProvinceService {
    async execute({ id, name, region, code }: IUpdateProvince) {
        let today = new Date()
        try {
            const provinceRepository = getCustomRepository(ProvinceRepository);
            const provinceID = await provinceRepository.findOne(id);
            if (provinceID) {
                if (name && region && code) {
                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                        .update()
                        .set({ provinceName: name, region, codeProvince: code, updatedAt: today})
                        .where("id = :id", { id: id })
                        .execute();
                    return provinceUpdate;
                }
                if (region) {
                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                        .update()
                        .set({ region: region, updatedAt: today })
                        .where("id = :id", { id: id })
                        .execute();
                    return provinceUpdate;
                } if (code) {
                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                        .update()
                        .set({ codeProvince: code, updatedAt: today })
                        .where("id = :id", { id: id })
                        .execute();
                    return provinceUpdate;
                } if (name) {
                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                        .update()
                        .set({ provinceName: name, updatedAt: today })
                        .where("id = :id", { id: id })
                        .execute();
                    return provinceUpdate;
                }
            }
        } catch (error) {
            return error;
        }
    }
}