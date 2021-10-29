import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../../repositories/country.repository';

export interface ICountryByID {id: number}
export default class CountryByIDService {
    async execute({ id }: ICountryByID) {
        try {
            const countryRepository = getCustomRepository(CountryRepository);
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