import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import TravelsRepository from "../../repositories/travels.repository";

export default class DeleteAllTravelController {
    async handle(request: Request, response: Response<AppResponse<string>>) {
        try {
            const travelsRepository = getCustomRepository(TravelsRepository)
            if (await travelsRepository.find()) {
                await travelsRepository
                    .createQueryBuilder()
                    .delete()
                    .execute();
                return response.status(200)
                    .json({ success: true, message: 'Todas Viagens Removidas.' });
                } 
            else{
                return response.status(400)
                    .json({ success: false, message: "Sem Viagens Registradas." })
            }
        }
        catch(err) {
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}
