import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TravelsRepository from "../../repositories/travels.repository";


export default class DeleteAllTravelController {
    async handle(request: Request, response: Response) {

        const travelsRepository = getCustomRepository(TravelsRepository)
        try {
            const findAllTravell = await travelsRepository.find();

            if (findAllTravell) {
                const deleteAllTravel = await travelsRepository
                    .createQueryBuilder()
                    .delete()
                    .execute();
                    return response
                        .json({
                            success: true,
                            message: 'Travel Deleted',
                            data: deleteAllTravel
                   })
                } 
               
            else {
                return response
                    .json({
                        success: false,
                        message: "Not exist data in table",

                    })
            }
        }
        catch (err) {
            return err;
        }
    }
}