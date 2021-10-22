import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../repositories/country.repository';


export interface IReadCountryByID {
    id: number
}
export default class ReadCountryByID {
    async execute({ id }: IReadCountryByID) {
        const countryRepository = getCustomRepository(CountryRepository);
        try {
            const countryID = await countryRepository.findOne(id);
            if (countryID) {
                const country = await countryRepository
                    .createQueryBuilder()
                    .where("id = :id", { id: id})
                    .getOne();
                    return country;
            }
        } catch (error) {
            return error
        }
    }
}