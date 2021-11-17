import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import UpdateTravel, { IUpdateTravels } from "../../services/travels/updateTravels.service";
import { getCustomRepository } from "typeorm";
import ProvincesRepository from "../../repositories/provinces.repository";
import TravelsRepository from "../../repositories/travels.repository";

export default class UpdateTravelsController {
    async handle(request: Request<IUpdateTravels>, response: Response<AppResponse<string>>) {
        try {
            const
                updateTravels = new UpdateTravel(),
                { id,
                    departureDate,
                    returnDate,
                    timeToGoTo,
                    timeToArrival,
                    observations,
                    spotId,
                    originProvince,
                    destinyProvince,
                    transportId,
                    price } = request.body,

                travelsRepository = getCustomRepository(TravelsRepository),
                provincesRepository = getCustomRepository(ProvincesRepository),
                verifyIdProvinceOrigin = await provincesRepository.findOne({ where: { id: originProvince } }),
                verifyIdProvinceDestiny = await provincesRepository.findOne({ where: { id: destinyProvince } }),
                findTravelsDeparture = await travelsRepository.findOne({
                    where: { departureDate },
                    relations: ['transport', 'originProvince', 'destinyProvince']
                });

            if (findTravelsDeparture) {
                const { id } = findTravelsDeparture.transport;
                if (id === transportId) {
                    return response.status(400)
                        .json({ success: false, message: "Este autocarro já está escalado para esse dia" })
                }
            }
            if (departureDate) {
                const partida = departureDate.toLocaleString().split("-"),
                    retorno = returnDate.toLocaleString().split("-");
                if (partida[0] > retorno[0]) {
                    return response.status(200)
                        .json({ success: false, message: "Viagem nao foi Criada. data incorreta, o ano de partida não pode ser maior que o de retorno" });
                }
                if (partida[1] > retorno[1]) {
                    return response.status(400)
                        .json({ success: false, message: "Viagem nao foi Criada. data incorreta, o mês de partida não pode ser maior que o de retorno" });
                }
                if (partida[2] > retorno[2]) {
                    return response.status(400)
                        .json({ success: false, message: "Viagem nao foi Criada. data incorreta, o dia de partida não pode ser maior que o de retorno" });
                }
            }
            if (verifyIdProvinceOrigin.id === verifyIdProvinceDestiny.id) {
                return response.status(400)
                    .json({ success: false, message: "Verifique Se esta mandando os Dados correctamente. a origem não pode coincidir com o destino" })

            }
            if (await updateTravels.execute({
                id,
                departureDate,
                returnDate,
                timeToGoTo,
                timeToArrival,
                observations,
                spotId,
                originProvince,
                destinyProvince,
                transportId,
                price
            })) {
                return response.status(200)
                    .json({ success: true, message: "Dados Actualizados." });
            }
        }
        catch (err) {
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}
