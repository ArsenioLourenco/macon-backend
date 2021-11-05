import { getCustomRepository } from 'typeorm';
import ProvinceRepository from '../../../repositories/province.repositoy';

export interface IUpdateProvince { id: number, name: string, region: string, code: string }

export default class UpdateProvinceService {
    async execute({ id, name, region, code }: IUpdateProvince) {
        try {
            const provinceRepository = getCustomRepository(ProvinceRepository);
            const provinceID = await provinceRepository.findOne(id);
            if (provinceID) {
                if (name && region && code) {
                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                        .update()
                        .set({ provinceName: name, region, codeProvince: code })
                        .where("id = :id", { id: id })
                        .execute();
                    return provinceUpdate;
                }
                else if (region) {
                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                        .update()
                        .set({ region: region })
                        .where({ id })
                        .execute();
                    return provinceUpdate;
                } else if (code) {
                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                        .update()
                        .set({ codeProvince: code })
                        .where({ id })
                        .execute();
                    return provinceUpdate;
                } else if (name) {
                    const provinceUpdate = await provinceRepository.createQueryBuilder()
                        .update()
                        .set({ provinceName: name })
                        .where({ id })
                        .execute();
                    return provinceUpdate;
                }
            }
        } catch (error) {
            return error;
        }
    }
}