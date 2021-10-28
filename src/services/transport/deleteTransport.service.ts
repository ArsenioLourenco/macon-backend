import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/Transport";

export default class DeleteTransport{
    async execute(id:number){
        const transportRepository = getCustomRepository(
            TransportRepository
        )
        try{
            const getIdTransport = await transportRepository.findOne({where:{id:id}})
            if(!getIdTransport) {
                return "This Transport not exist";   
            }
            const deleteTransport = await transportRepository
                .createQueryBuilder()
                .delete()
                .where("id = :id", { id: id })
                .execute();
            return deleteTransport;
        }catch(err){
            return err.message;
        }
      
    }

}