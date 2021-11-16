import { getCustomRepository } from "typeorm";
import TypeTransportRepository from "../../repositories/typeTransport.repository";
export default class DeleteTypeTransport {
    async execute(id: number) {
        let today = new Date()
        try {
            const typetransportRepository = getCustomRepository(TypeTransportRepository);
            const getIdTypeTransport = await typetransportRepository.findOne(id);

            if (!getIdTypeTransport) {
                return "Esse transporte não Existe";
            }
            await typetransportRepository
                .createQueryBuilder()
                .update()
                .set({ deletedAt: today })
                .where("id = :id", { id: id })
                .execute();
            return 'Modelo de Transporte Removido com Sucesso!';
        }
        catch (err) {
            return err;
        }

    }

}