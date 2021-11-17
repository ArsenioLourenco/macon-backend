import { getCustomRepository } from "typeorm";
import TravelsRepository from "../../repositories/travels.repository";

export default class DeleteTravel {
    async execute(id: number) {
        try {
            const travelsRepository = getCustomRepository(TravelsRepository);
            const deleteTravel = await travelsRepository.findOne({ where: { id } })
            if (deleteTravel) {
                return deleteTravel;
            }
        }
        catch (err) {
            return err.message;
        }
    }
}
