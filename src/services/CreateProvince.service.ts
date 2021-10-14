import { getCustomRepository } from 'typeorm';
import CountryRepository from '../repositories/country.repository';
import ProvinceRepository from '../repositories/province.repositoy';


export interface ICreateProvince {
    name: string,
    region?: string,
    code?: string,
    countryID: number,
}

export default class CreateProvince {
    async execute({
        name,
        region,
        code,
        countryID
    }: ICreateProvince) {
        try {
            if (!name) {
                return 'Entra o nome da Provincia';
            }

            const provinceRepository = getCustomRepository(
                ProvinceRepository
            );
            const coutryRepository = getCustomRepository(
                CountryRepository
            );

            const provinciaExist = provinceRepository.findOne({ where: { provinceName: name }});

            if(provinciaExist){
                return 'Essa provincia ja esta na base de dados';
            }else{
                const countryExist = await coutryRepository.findOne(
                    countryID
                );

                if(!countryExist){
                    return 'Country already Exist';
                }else{
                    const createProvince = provinceRepository.create({
                        provinceName: name,
                        region: region,
                        codeProvince: code,
                        country: countryExist
                    });

                    await provinceRepository.save(
                        createProvince
                    );
                    return createProvince;
                }
            }
        } catch (error) {
            return error;
        }
    }
}