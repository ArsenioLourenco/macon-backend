import { getCustomRepository } from "typeorm";
import ProvinceRepository from "../../repositories/province.repositoy";


export interface IProvinceByID {
    id: number
}

export default class ProvinceByIDService {
    async execute({ id }: IProvinceByID) {
        const provinceRepository = getCustomRepository(ProvinceRepository);
        try {
            const provinceID = await provinceRepository.findOne(id);
            if (provinceID) {
                const province = await provinceRepository
                    .createQueryBuilder()
                    .where("id = :id", { id: id })
                    .getOne();

                    return province;
            }
        } catch (error) {
            return error
        }
    }
}