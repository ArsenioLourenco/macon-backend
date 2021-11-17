import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { Transport } from "../../models/Transport";
import CreateTransport, { ICreateTransport } from "../../services/transport/createTransport.service";
import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/Transport";


export default class CreateTransportController {
    async handle(request: Request<ICreateTransport>, response: Response<AppResponse<Transport[]>>) {
        try {
            const
                { transportName, transportNumber, totalPlace, typeTransport } = request.body,
                createTransportController = new CreateTransport(),
                transportRepository = getCustomRepository(TransportRepository),
                alreadyExistsTransportNumber = await transportRepository.findOne({ where: { transportNumber } });

            if (alreadyExistsTransportNumber) {
                return response.status(400)
                    .json({ success: false, message: "Não é permitido duplicação de Transport" });
            }
            const creating = await createTransportController.execute({ transportName, transportNumber, totalPlace, typeTransport });

            if (creating) {
                return response.status(200)
                    .json({ success: true, message: "Transport criado com sucesso", data: creating });
            }

            else {
                return response.status(400)
                    .json({ success: false, message: "Este Transport não existe" });
            }

        }
        catch (err) {
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}