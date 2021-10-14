import { getCustomRepository } from 'typeorm';
import CountryRepository from '../repositories/country.repository';


export interface ICreateCountry {
    name: string,
    region: string,
    code: string,
}

export default class CreateCountry {
    async execute({
        name,
        region,
        code,
    }: ICreateCountry) {
        try {
            if (!name) {
                return 'Entra o nome da Provincia';
            }

            const countryRepository = getCustomRepository(
                CountryRepository
            );

            const countryExist = countryRepository.findOne({ where: { countryName: name } });

            if (!countryExist) {
                return 'Country already Exist';
            } else {
                const createCountry = countryRepository.create({
                    countryName: name,
                    region: region,
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