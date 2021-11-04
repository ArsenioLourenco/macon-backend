import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import UpdateTravel, { IUpdateTravels } from "../../services/travels/updateTravels.service";

export default class UpdateTravelsController {
    async handle(request: Request<IUpdateTravels>, response: Response<AppResponse<string>>) {
        try {
            const 
                updateTravels = new UpdateTravel(),
                { ... price } = request.body;
            if (await updateTravels.execute({ ... price })){
                return response.status(200)
                    .json({ success: true, message: "Dados Actualizados." });
            }
        }
        catch(err){
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}
