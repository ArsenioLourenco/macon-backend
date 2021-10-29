import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../repositories/country.repository';

export interface ICreateCountry {
    name: string,
    region: string,
    code: string,
}
export default class CreateCountryService {
    async execute({
        name,
        region,
        code,
    }: ICreateCountry) {
        const countryRepository = getCustomRepository(CountryRepository);
        const countryExist = await countryRepository.findOne({ where: { countryName: name } });
        try {

            if (!countryExist) {
                const createCountry = countryRepository.create({
                    countryName: name,
                    region,
                    codeCountry: code,
                });
    
                await countryRepository.save(createCountry);
    
                return createCountry;
            }

            

        } catch (error) {
            return error;
        }
    }
}