import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../repositories/country.repository';
import ProvinceRepository from '../../repositories/province.repositoy';
export interface ICreateProvince {
    name: string,
    region: string,
    code: string,
    countryID: number,
}
export default class CreateProvince {
    async execute({
        name,
        region,
        code,
        countryID
    }: ICreateProvince) {
        const provinceRepository = getCustomRepository(ProvinceRepository);
        const coutryRepository = getCustomRepository(CountryRepository);
        try {
            const provinceExist = await provinceRepository.findOne({ where: { provinceName: name } });
            if (provinceExist) {
                return 'Essa provincia ja existe nessa base de dados';
            } else {
                const countryExist = await coutryRepository.findOne(countryID);
                if (!countryExist) {
                    return 'Esse pais nao exite na base de dados';
                } else {
                    const createProvince = provinceRepository.create({
                        provinceName: name,
                        region: region,
                        codeProvince: code,
                        countryID: countryExist
                    });
                    await provinceRepository.save( createProvince);
                    return createProvince;
                }
            }
        } catch (error) {
            return error;
        }
    }
}