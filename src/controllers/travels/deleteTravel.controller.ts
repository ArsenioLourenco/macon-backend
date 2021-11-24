import { Request, Response } from "express";
import { AppResponse, IDelete } from "../../@types";
import DeleteTravel from "../../services/travels/deleteTravels.service";

export default class DeleteTravelController {
    async handle(request: Request<IDelete>, response: Response<AppResponse<string>>) {
        try {
            const
                deletetravelService = new DeleteTravel(),
                { id } = request.params,
                travel = await deletetravelService.execute(id);
            if (travel) {
                return response.status(200)
                    .json({ success: true, message: `Usuário ${id} Removido`, data: travel });
            }
            else {
                return response.status(400)
                    .json({ success: true, message: 'Esta viagem não existe' });
            }
        } catch (err) {
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}

      