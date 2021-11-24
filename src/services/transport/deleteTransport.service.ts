import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/Transport";

export default class DeleteTransport{
    async execute( id: number ){
        let today = new Date()
        try{
            const transportRepository = getCustomRepository( TransportRepository );
            const alreadyExistTransport = await transportRepository.findOne({ where: { id } });

            if (alreadyExistTransport.deletedAt===null) {
                const transport = await transportRepository
                    .createQueryBuilder()
                    .update()
                    .set({deletedAt: today })
                    .where("id = :id", { id: id })
                    .execute();
                return transport
            }
        } catch (err) {
            return err.message;
        }

    }

}