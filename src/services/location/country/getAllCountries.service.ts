import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../../repositories/country.repository';
export default class CountriesService {
    async execute() {
        try {
            let today = new Date()
            const countryRepository = getCustomRepository(CountryRepository);
            const country = await countryRepository.find({ where: { deletedAt: null } });
            if (country) {
                return country;
            }
        } catch (error) {
            return error
        }
    }
}