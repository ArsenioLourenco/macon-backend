import { getCustomRepository } from "typeorm";
import TravelsRepository from "../../repositories/travels.repository";

 export default class DeleteTravel{
     async execute( id: number ){
         try{
            const travelsRepository= getCustomRepository( TravelsRepository );             
            await travelsRepository
                .createQueryBuilder()
                .delete()
                .where("id = :id", { id: id })
                .execute();
            return "Viagem Cancelada."
         } 
         catch(err){
             return err.message;
         }
     }
 }