import { getCustomRepository } from 'typeorm';
import SpotRepository from '../../../repositories/spot.repository';
export default class SpotsService {
    async execute() {
        try {
            const spotRepository = getCustomRepository(SpotRepository);
            const spot = await spotRepository.find();
            if (spot) {
                const spots = await spotRepository
                    .createQueryBuilder()
                    .getMany();
                return spots;
            }
        } catch (error) {
            return error
        }
    }
}