import { getCustomRepository } from 'typeorm';
import CountryRepository from '../repositories/country.repository';
import ProvinceRepository from '../repositories/province.repositoy';
import SpotRepository from '../repositories/spot.repository';

export interface ICreatePoint {
    name: string;
    description?: string;
    location?: string;
    contact?: string;
    provinceID: string;
}

export class CreatePoint {
    async execute({
        name,
        description,
        location,
        contact,
        provinceID,
    }: ICreatePoint) {
        const spotRepository = getCustomRepository(
            SpotRepository
        );
        const provinceRepository = getCustomRepository(
            ProvinceRepository
        );

        try {
            if(!name){
                return 'Entra o nome do Ponto!';
            }

            const pontoExist = await spotRepository.findOne({where: {spotName: name}})

            if(pontoExist){
                return 'Ponto ja existente!'
            }else{
                const provincia = await provinceRepository.findOne(
                    provinceID
                );
                if(!provincia){
                    return 'Essa Provincia Nao existe na base de dados'
                }else{
                    const createPonto = spotRepository.create({
                        spotName: name,
                        description: description,
                        location: location,
                        contacts: contact,
                        province: provincia, 
                    });

                    await spotRepository.save(
                        createPonto
                    );
                }
            }

        } catch (error) {
            return error;
        }

    }
}