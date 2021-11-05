import { getCustomRepository } from 'typeorm';
import SpotRepository from '../../../repositories/spot.repository';

export interface IUpdateSpot { id: number, name: string, description: string, location: string, contacts: string }

export default class UpdateSpotService {
    async execute({ id, name, description, location, contacts }: IUpdateSpot) {
        try {
            const spotRepository = getCustomRepository(SpotRepository);
            if (name && description && location && contacts) {
                const spotUpdate = spotRepository
                    .createQueryBuilder()
                    .update()
                    .set({ spotName: name, description, location, contacts })
                    .where("id = :id", { id: id })
                    .execute();
                return spotUpdate;
            }
            if (name) {
                const spotUpdate = spotRepository
                    .createQueryBuilder()
                    .update()
                    .set({ spotName: name })
                    .where("id = :id", { id: id })
                    .execute();
                return spotUpdate;
            }
            if (description) {
                const spotUpdate = spotRepository
                    .createQueryBuilder()
                    .update()
                    .set({ description })
                    .where("id = :id", { id: id })
                    .execute();
                return spotUpdate;
            }
            if (location) {
                const spotUpdate = spotRepository
                    .createQueryBuilder()
                    .update()
                    .set({ location })
                    .where("id = :id", { id: id })
                    .execute();
                return spotUpdate;
            }
            if (contacts) {
                const spotUpdate = spotRepository
                    .createQueryBuilder()
                    .update()
                    .set({ contacts })
                    .where("id = :id", { id: id })
                    .execute();
                return spotUpdate;
            }
        } catch (error) {
            return error;
        }
    }
}