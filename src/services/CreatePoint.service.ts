import { getCustomRepository } from 'typeorm';
import CountryRepository from '../repositories/country.repository';
import ProvinceRepository from '../repositories/province.repositoy';
import SpotRepository from '../repositories/spot.repository';

export interface ICreatePoint {
    name: string;
    description?: string;
    location: string;
    contact: string;
    provinceId: string;
    countryId: string
}

export class CreatePoint {
    async execute({
        name,
        description,
        location,
        contact,
        provinceId,
        countryId
    }: ICreatePoint) {
        const spotRepository = getCustomRepository(
            SpotRepository
        );
        const countryRepository = getCustomRepository(
            CountryRepository
        );
        const provinceRepository = getCustomRepository(
            ProvinceRepository
        );

        try {

        } catch (error) {

        }

    }
}