import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { Transport } from "../../models/Transport";
import CreateTransport, { ICreateTransport } from "../../services/transport/createTransport.service";
import { getCustomRepository } from "typeorm";
import TransportRepository from "../../repositories/Transport";
import TypeTransportRepository from "../../repositories/typeTransport.repository";


export default class CreateTransportController {
    async handle(request: Request<ICreateTransport>, response: Response<AppResponse<Transport[]>>) {
        try {
            const
                {transportName, transportNumber, totalPlace, typeTransport} = request.body,
                createTransportController = new CreateTransport(),
                transportRepository = getCustomRepository(TransportRepository),
                typeTransportRepository = getCustomRepository(TypeTransportRepository ),
                verifyIfExistTypeTransport = await typeTransportRepository.findOne( {where:{id:typeTransport}} ),
                alreadyExistsTransportNumber = await transportRepository.findOne({ where: { transportNumber } });


            if (alreadyExistsTransportNumber) {
                return response.status(400)
                    .json({ success: false, message: "Não é permitido duplicação de Transport" });
            }

            if (!verifyIfExistTypeTransport) {
                return response.status(400)
                    .json({ success: false, message: "tipo de transport errado. informe um tipo de transport correto" });
            }

            const transports = await createTransportController.execute({ transportName, transportNumber, totalPlace, typeTransport});

            if (transports) {
                return response.status(200)
                    .json({ success: true, message: "Transport criado com sucesso", data: transports });
            }

            else {
                return response.status(400)
                    .json({ success: false, message: "Transport não criado" });
            }

        }
        catch (err) {
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}