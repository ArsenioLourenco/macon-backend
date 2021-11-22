import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../../repositories/country.repository';

export interface IDeleteCountry {id: number,}
export default class DeleteCountry {
    async execute({id}: IDeleteCountry) {
        let today = new Date()
        try {
            const countryRepository = getCustomRepository(CountryRepository);
            const countryID = countryRepository.findOne({id});
            if ((await countryID).deletedAt===null) {
                const deleteCountry = await countryRepository
                    .createQueryBuilder()
                    .update()
                    .set({deletedAt: today})
                    .where("id = :id", { id: id })
                    .execute();
                return deleteCountry;
            }
        } catch (error) {
            return error;
        }
    }
}