import { Request, Response } from "express";
import { AppResponse, IDelete } from "../../@types";
import DeleteTravel  from "../../services/travels/deleteTravels.service";

export default class DeleteTravelController{
    async handle(request: Request<IDelete>, response: Response<AppResponse<string>>){
        try{
            const 
                deletetravelService = new DeleteTravel(),
                id = Number (request.params.id);
            await deletetravelService.execute( id );
            return response.status(200)
                .json({ success: true, message: `Usuário ${id} Removido` });
        }catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}
