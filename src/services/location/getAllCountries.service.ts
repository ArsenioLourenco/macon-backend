import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../repositories/country.repository';
export default class CountriesService {
    async execute() {
        const countryRepository = getCustomRepository(CountryRepository);
        try {
            const country = await countryRepository.find();

            if (country) {
                const countries = await countryRepository
                    .createQueryBuilder()
                    .getMany();
                return countries;
            }
        } catch (error) {
            return error
        }
    }
}