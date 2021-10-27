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
        const countryRepository = getCustomRepository(CountryRepository);
        try {
            const provinceExist = await provinceRepository.findOne({ where: { provinceName: name } });
            const countryExist = await countryRepository.findOne({ where: { id: countryID } });

            if (!countryExist) {
                return 'Esse pais ja exite na base de dados';
            }
            if (provinceExist) {
                return 'Essa provincia ja existe na base de dados';
            }
            const createProvince = provinceRepository.create({
                provinceName: name,
                region: region,
                codeProvince: code,
                countryID: countryExist
            });
            await provinceRepository.save(createProvince);

            return createProvince;

        } catch (error) {
            return error;
        }
    }
}