import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../../repositories/country.repository';

export interface IDeleteCountry {id: number,}
export default class DeleteCountry {
    async execute({id}: IDeleteCountry) {
        try {
            const countryRepository = getCustomRepository(CountryRepository);
            const countryID = countryRepository.findOne(id);
            console.log('mauro');
            console.log((await countryID).countryName);
            if (countryID) {
                const deleteCountry = await countryRepository
                    .createQueryBuilder()
                    .delete()
                    .where("id = :id", { id: id })
                    .execute();
                return deleteCountry;
            }
        } catch (error) {
            return error;
        }
    }
}