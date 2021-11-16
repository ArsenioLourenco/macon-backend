import { getCustomRepository } from "typeorm";
import TravelsRepository from "../../repositories/travels.repository";

 export default class DeleteTravel{
     async execute( id: number ){
        let today = new Date()
         try{
            const travelsRepository= getCustomRepository( TravelsRepository );             
            await travelsRepository
            .createQueryBuilder()
            .update()
            .set({deletedAt: today})
            .where("id = :id", { id: id })
            .execute();
            return "Viagem Cancelada."
         } 
         catch(err){
             return err.message;
         }
     }
 }
