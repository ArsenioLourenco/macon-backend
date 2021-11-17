import { getCustomRepository } from 'typeorm';
import SpotRepository from '../../../repositories/spot.repository';
export default class SpotsService {
    async execute() {
        try {
            const spotRepository = getCustomRepository(SpotRepository);
            const spot = await spotRepository.find({ where: { deletedAt: null } });
            if (spot) {
                return spot;
            }
        } catch (error) {
            return error
        }
    }
}