import { Request, Response } from "express";
import DeleteTravel  from "../../services/travels/deleteTravels.service";

export default class DeleteTravelController{
    async handle(request:Request, response:Response){
        const id= Number (request.params.id);
        const deletetravel=new DeleteTravel()
        try{
            const deleteTravelId= await deletetravel.execute(id)
            if(deleteTravelId){
                return response.status(200)
                .json({
                success: true,
                message: 'Travel deleted',
                data: deleteTravelId
                })
            }
            }catch(err){
                return err
            }
        }
    }
