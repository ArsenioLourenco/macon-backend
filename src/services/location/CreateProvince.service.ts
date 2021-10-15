import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../repositories/country.repository';
import ProvinceRepository from '../../repositories/province.repositoy';
export interface ICreateProvince {
    name: string,
    region?: string,
    code?: string,
    countryID: number,
}

export default class CreateProvince {
    async execute({
        name,
        region,
        code,
        countryID
    }: ICreateProvince) {
        try {

            const provinceRepository = getCustomRepository(ProvinceRepository);
            const coutryRepository = getCustomRepository(CountryRepository);
            const provinciaExist = await provinceRepository.findOne({ where: { provinceName: name } });
            const countryExist = await coutryRepository.findOne(countryID);

            if (!name) {
                return 'Entra o nome da Provincia';
            }

            if (provinciaExist) {
                return 'Essa provincia ja esta na base de dados';
            } else {

                if (!countryExist) {
                    return 'This country already Exist';
                } else {
                    const createProvince = provinceRepository.create({
                        provinceName: name,
                        region: region,
                        codeProvince: code,
                        country: countryExist
                    });

                    await provinceRepository.save(
                        createProvince
                    );
                    return createProvince;
                }
            }
        } catch (error) {
            return error;
        }
    }
}