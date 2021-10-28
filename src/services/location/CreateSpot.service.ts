import { getCustomRepository } from 'typeorm';
import { Spots } from '../../models/Spots';
import ProvinceRepository from '../../repositories/province.repositoy';
import SpotRepository from '../../repositories/spot.repository';
export interface ICreateSpot {
    name: string,
    description: string,
    location: string,
    contacts: string,
    province: number,
}
export default class CreateSpot {
    async execute({
        name,
        description,
        location,
        contacts,
        province,
    }: ICreateSpot) {
        const spotRepository = getCustomRepository(SpotRepository);
        const provinceRepository = getCustomRepository(ProvinceRepository);
        try {

            const pontoExist = await spotRepository.findOne({ where: { spotName: name }});
            const provinceExist = await provinceRepository.findOne({ where: { id: province } });

            if (!pontoExist) {
                if (provinceExist) {
                    const createPonto = await spotRepository
                        .createQueryBuilder()
                        .insert()
                        .into(Spots)
                        .values(
                            {
                                spotName: name,
                                description: description,
                                location: location,
                                contacts: contacts,
                                province: provinceExist,
                            }
                        )
                        .execute();
                    return createPonto;
                }
            } 
            
        } catch (error) {
            return error;
        }

    }
}
