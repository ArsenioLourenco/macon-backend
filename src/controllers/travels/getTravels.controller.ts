import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppResponse } from "../../@types";
import { Travels } from "../../models/Travels";
import TravelsRepository from "../../repositories/travels.repository";
import { format } from "date-fns";
export interface IGetTravel {
    originProvince: number,
    destinyProvince: number,
    departureDate: Date,
    returnDate?: Date
}
export default class GetTravelsController {
    async handle(request: Request<IGetTravel>, response: Response<AppResponse<Travels[]>>) {
        try {
            const { originProvince, destinyProvince, departureDate, returnDate } = request.params;
            const today = format(new Date, "yyyy-MM-dd");

            if (today > String(departureDate)) {
                return response.status(400).json({ success: false, message: 'essa viagem já ocorreu' })
            }
            if (!returnDate) {
                const
                    travelsRepository = getCustomRepository(TravelsRepository),
                    travel = await travelsRepository.find(
                        {
                            where: { originProvince, destinyProvince, departureDate },
                            relations: ['originProvince', 'destinyProvince', 'transport']
                        }
                    );

                if (travel.length != 0) {
                    return response.status(200)
                        .json({ success: true, data: travel });
                }
                else {
                    return response.status(400)
                        .json({ success: false, message: 'Não Temos Essa Viagem Agendada.' });
                }
            }
            const
                travelsRepository = getCustomRepository(TravelsRepository),
                travel = await travelsRepository.find(
                    {
                        where: { originProvince, destinyProvince, departureDate, returnDate },
                        relations: ['originProvince', 'destinyProvince', 'transport']
                    }
                );
            if (travel.length != 0) {
                return response.status(200)
                    .json({ success: true, data: travel });
            }
            else {
                return response.status(400)
                    .json({ success: false, message: 'Não Temos Essa Viagem Agendada.' });
            }
        } catch (err) {
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}