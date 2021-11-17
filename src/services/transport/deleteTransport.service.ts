import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/Transport";

export default class DeleteTransport {
    async execute(id: number) {
        try {
            const transportRepository = getCustomRepository(TransportRepository);
            const alreadyExistTransport = await transportRepository.findOne({ where: { id } });

            if (alreadyExistTransport) {
                const deleted = await transportRepository
                    .createQueryBuilder()
                    .delete()
                    .where("id = :id", { id: id })
                    .execute();
                return deleted
            }
        } catch (err) {
            return err.message;
        }

    }

}