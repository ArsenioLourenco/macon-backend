import { getCustomRepository } from "typeorm";
import { Travels } from "../../models/Travels";
import TravelsRepository from "../../repositories/travels.repository";

 



 export class DeleteTravel{
     async execute(id:number){
         const travelsRepository= getCustomRepository(TravelsRepository)

         try{
             const readyIdTravel= travelsRepository.findOne(id)
             if(!readyIdTravel){
                 return 'this Travel not exist'
             }

             const deletetravel = await travelsRepository
             .createQueryBuilder()
             .delete()
             .from(Travels)
             .where("id = :id", { id: id})
             .execute();

             return deletetravel
         } 
         catch(err){
             return err
         }
     }

 }