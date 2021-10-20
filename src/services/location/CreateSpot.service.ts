import { getCustomRepository } from 'typeorm';
import ProvinceRepository from '../../repositories/province.repositoy';
import SpotRepository from '../../repositories/spot.repository';
export interface ICreateSpot {
    name: string,
    description: string,
    location: string,
    contacts: string,
    provinceID: number
}
export class CreateSpot {
    async execute({
        name,
        description,
        location,
        contacts,
        provinceID,
    }: ICreateSpot) {
        const spotRepository = getCustomRepository(SpotRepository);
        const provinceRepository = getCustomRepository(ProvinceRepository);
        try {
            const pontoExist = await spotRepository.findOne({ where: { SpotsName: name } });
            if (pontoExist) {
                return 'Ponto ja existe nessa base de dados';
            } else {
                const provinceExist = await provinceRepository.findOne(provinceID);
                if (!provinceExist) {
                    return 'Essa Provincia nao existe na base de dados';
                } else {
                    const createPonto = spotRepository.create({
                        spotName: name,
                        description: description,
                        location: location,
                        contacts: contacts,
                        provinceID: provinceExist,
                    });
                    await spotRepository.save(createPonto);
                    return createPonto;
                }
            }

        } catch (error) {
            return error;
        }

    }
}