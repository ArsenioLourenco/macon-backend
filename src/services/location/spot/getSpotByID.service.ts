import { getCustomRepository } from 'typeorm';
import SpotRepository from '../../../repositories/spot.repository';

export interface ISpotByID { id: number }
export default class SpotByIDService {
    async execute({ id }: ISpotByID) {
        try {
            const spotRepository = getCustomRepository(SpotRepository);
            const spotID = await spotRepository.findOne(id);
            if (spotID) {
                const spot = await spotRepository
                    .createQueryBuilder()
                    .where("id = :id", { id: id })
                    .getOne();
                return spot;
            }
        } catch (error) {
            return error
        }
    }
}