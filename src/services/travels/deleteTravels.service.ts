import { getCustomRepository } from "typeorm";
import TravelsRepository from "../../repositories/travels.repository";

 export default class DeleteTravel{
     async execute( id: number ){
        let today = new Date()
         try{
            const travelRepository = getCustomRepository(TravelsRepository );
            const alreadyExistTravel = await travelRepository.findOne({ where:{id}});

            if (alreadyExistTravel.deletedAt===null) {
                const travel = await travelRepository
                    .createQueryBuilder()
                    .update()
                    .set({deletedAt: today })
                    .where("id = :id", { id: id })
                    .execute();
                return travel
         } 
         
     }
     catch(err){
        return err.message;
    }
 }
}
