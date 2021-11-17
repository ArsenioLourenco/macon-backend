import { Request, Response } from "express";
import { AppResponse } from "../../@types";
import { TypeTransport } from "../../models/TypeTransport";
import CreateTypeTransport, { ICreateTypeTransport } from "../../services/transport/createTypeTransport.service";

export default class CreateTypeTransportController {
    async handle(request: Request<ICreateTypeTransport>, response: Response<AppResponse<TypeTransport[]>>) {
        try {
            const
                createTypeTransportController = new CreateTypeTransport(),
                {
                    typeName,
                    description
                } = request.body,
                creating = await createTypeTransportController.execute({
                    typeName,
                    description
                });
            if (creating) {
                return response.status(200)
                    .json({ success: true, message: 'Tipo de trnansporte Criado com Sucesso', data: creating });
            }
            else {
                return response.status(400)
                    .json({ success: false, message: 'Já Existe um transporte Semelhante a Esse!' });
            }
        }
        catch (err) {
            return response.status(500)
                .json({ success: false, message: err.message });
        }
    }
}