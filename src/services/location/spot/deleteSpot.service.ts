import { getCustomRepository } from 'typeorm';
import SpotRepository from '../../../repositories/spot.repository';

export interface IDeleteSpot { id: number }
export default class DeleteSpot {
    async execute({ id }: IDeleteSpot) {
        try {
            const spotRepository = getCustomRepository(SpotRepository);
            const spotID = spotRepository.findOne(id);
            if (spotID) {
                const deleteCountry = await spotRepository
                    .createQueryBuilder()
                    .delete()
                    .where("id = :id", { id: id })
                    .execute();
                return deleteCountry;
            }
        } catch (error) {
            return error;
        }
    }
}