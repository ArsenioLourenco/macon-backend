import { getDefaultSettings } from 'http2';
import { getCustomRepository } from 'typeorm';
import CountryRepository from '../../../repositories/country.repository';

export interface ICreateCountry { name: string, region: string, code: string }
export default class CreateCountryService {
    async execute({ name, region, code }: ICreateCountry) {
        let today = new Date()
        try {
            const countryRepository = getCustomRepository(CountryRepository);
            const countryExist = await countryRepository.findOne({ where: { countryName: name } });
            if (!countryExist) {
                const createCountry = countryRepository.create({
                    countryName: name,
                    region,
                    codeCountry: code,
                    createdAt: today,
                });
                await countryRepository.save(createCountry);
                return createCountry;
            }
        } catch (error) {
            return error;
        }
    }
}