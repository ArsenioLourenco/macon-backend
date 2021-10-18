import { getCustomRepository } from "typeorm";
import TypeTransportRepository from "../../repositories/typeTransport.repository";


export default class DeleteTypeTransport{
    async execute(id:number){
        const typetransportRepository = getCustomRepository(
            TypeTransportRepository)

        try{
        
            const getIdTypeTransport = await typetransportRepository.findOne(id)
            if(!getIdTypeTransport) {
                return "This Type Transport not exist";   
            }
            
            const deleteTypeTransport = await typetransportRepository
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