import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../../repositories/country.repository';
import ProvinceRepository from '../../../repositories/province.repositoy';

export interface ICreateProvince { name: string, region: string, code: string, country: number }
export default class CreateProvinceService {
    async execute({ name, region, code, country }: ICreateProvince) {
        let today = new Date()
        try {
            const provinceRepository = getCustomRepository(ProvinceRepository);
            const countryRepository = getCustomRepository(CountryRepository);
            const provinceExist = await provinceRepository.findOne({ where: { provinceName: name } });
            const countryExist = await countryRepository.findOne({ where: { id: country } });
            if (countryExist) {
                if (!provinceExist) {
                    const createProvince = provinceRepository.create({
                        provinceName: name,
                        region: region,
                        codeProvince: code,
                        country: countryExist,
                        createdAt: today
                    });
                    const final = await provinceRepository.save(createProvince);
                    return final;
                }
            }
        } catch (error) {
            return error;
        }
    }
}