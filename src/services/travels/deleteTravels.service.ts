import { getCustomRepository } from "typeorm";
import TravelsRepository from "../../repositories/travels.repository";

 
 export default class DeleteTravel{
     async execute(id:number){
        const travelsRepository= getCustomRepository(
            TravelsRepository)

         try{
             const readyIdTravel = await travelsRepository.findOne(id)
             
             console.log("rosa" + readyIdTravel)
             if(readyIdTravel){
                
             const deletetravel = await travelsRepository
             .createQueryBuilder()
             .delete()
             .where("id = :id", { id:id})
             .execute();
             
             return deletetravel;
             }
             else{
                return "This travel not exist";
         }
 
           
         } 
         catch(err){
             return err
         }
     }

 }