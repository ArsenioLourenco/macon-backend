import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../repositories/country.repository';
export interface ICreateCountry {
    name: string,
    region?: string,
    code?: string,
}
export default class CreateCountry {
    async execute({
        name,
        region,
        code,
    }: ICreateCountry) {
        const countryRepository = getCustomRepository(CountryRepository);
        
        try {
            const countryExist = countryRepository
            .findOne({ where: { countryName: name } });

            if (!countryExist) {
                return 'Esse Pais ja existe na BD';
            } else {
                const createCountry = countryRepository.create({
                    countryName: name,
                    region,
                    codeCountry: code,
                });

                await countryRepository.save(
                    createCountry
                );

                return createCountry;
            }
        } catch (error) {
            return error;
        }
    }
}