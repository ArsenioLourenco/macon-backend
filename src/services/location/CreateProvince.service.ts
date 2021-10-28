import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../repositories/country.repository';
import ProvinceRepository from '../../repositories/province.repositoy';
export interface ICreateProvince {
    name: string,
    region: string,
    code: string,
    country: number,
}
export default class CreateProvince {
    async execute({
        name,
        region,
        code,
        country
    }: ICreateProvince) {
        const provinceRepository = getCustomRepository(ProvinceRepository);
        const countryRepository = getCustomRepository(CountryRepository);
        try {
            const provinceExist = await provinceRepository.findOne({ where: { provinceName: name } });
            const countryExist = await countryRepository.findOne({ where: { id: country } });
            
            if (countryExist) {
                if (!provinceExist) {
                    const createProvince = provinceRepository.create({
                        provinceName: name,
                        region: region,
                        codeProvince: code,
                        country: countryExist
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