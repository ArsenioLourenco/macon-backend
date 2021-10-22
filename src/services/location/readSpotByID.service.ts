import { getCustomRepository } from 'typeorm';
import SpotRepository from '../../repositories/spot.repository';


export interface IReadSpotByID {
    id: number
}
export default class ReadSpotByID {
    async execute({ id }: IReadSpotByID) {
        const spotRepository = getCustomRepository(SpotRepository);
        try {
            const spotID = await spotRepository.findOne(id);
            if (spotID) {
                const spot = await spotRepository
                    .createQueryBuilder()
                    .where("id = :id", { id: id})
                    .getOne();
                    return spot;
            }
        } catch (error) {
            return error
        }
    }
}