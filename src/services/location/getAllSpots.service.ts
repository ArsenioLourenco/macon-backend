import { getCustomRepository } from 'typeorm';
import SpotRepository from '../../repositories/spot.repository';
export default class SpotsService {
    async execute() {
        const spotRepository = getCustomRepository(SpotRepository);
        try {
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