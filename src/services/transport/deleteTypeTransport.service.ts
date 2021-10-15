import { getCustomRepository } from "typeorm";
import TypeTransportRepository from "../../repositories/typeTransport.repository";


export default class DeleteTypeTransport{
    async execute(id:number){
        const TypetransportRepository = getCustomRepository(
            TypeTransportRepository)

        try{
        
            const getIdTypeTransport = await TypetransportRepository.findOne(id)
            if(!getIdTypeTransport) {
                return "This Type Transport not exist";   
            }
            
            const deleteTypeTransport = await TypetransportRepository
                .createQueryBuilder()
                .delete()
                .where("id = :id", {id: id})
                .execute();
            
            return deleteTypeTransport;
        }
        catch(err){
            return err;
        }
      
    }

}