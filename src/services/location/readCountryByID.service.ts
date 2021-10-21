import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../repositories/country.repository';


export interface IReadCountryID {
    id: number
}

export default class ReadCountryID {
    async execute({ id }: IReadCountryID) {
        const countryRepository = getCustomRepository(CountryRepository);
        try {
            const countryID = await countryRepository.findOne(id);
            if (countryID) {
                const country = await countryRepository
                    .createQueryBuilder("Countries")
                    .getMany();

                    return country;
            }
        } catch (error) {
            return error
        }
    }
}