import { getCustomRepository } from "typeorm";
import TypeTransportRepository from "../../repositories/typeTransport.repository";

export interface ICreateTypeTransport {
    typeName: string,
    description: string
}
export default class CreateTypeTransport {
    async execute({ typeName, description }: ICreateTypeTransport) {
        try {
            const
                typeTransportRepository = getCustomRepository(TypeTransportRepository),
                verifyIfExistTypeTransport = await typeTransportRepository.findOne({ where: { typeName } });
            if (!verifyIfExistTypeTransport) {
                const creating = typeTransportRepository.create({
                    typeName,
                    description
                });
                return await typeTransportRepository.save(
                    creating
                );
            }
        }
        catch (err) {
            return err.message
        }
    }
}