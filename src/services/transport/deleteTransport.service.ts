import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/Transport";

export default class DeleteTransport{
    async execute( id: number ){
        try{
            const transportRepository = getCustomRepository( TransportRepository );
            const alreadyExistTransport = await transportRepository.findOne({ where: { id } });

            if(!alreadyExistTransport) {
                return "This Transport not exist";   
            }
            await transportRepository
                .createQueryBuilder()
                .delete()
                .where("id = :id", { id: id })
                .execute();
            return 'Transporte Removido com Sucesso!';
        }catch(err){
            return err.message;
        }
      
    }

}