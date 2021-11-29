import { getCustomRepository } from "typeorm";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";

export interface IAgendTravelContactReference {
    reference: string;
}

export default class AgendTravelContactReferenceService {
    async execute({ reference }: IAgendTravelContactReference) {

        try {
            const agendTravelRepository = getCustomRepository(AgendTravelsRepository)

            const agendTravel = await agendTravelRepository.findOne({ where: [{ phoneNumber: reference }, { userAgendCode: reference }], relations: ['travel', 'travel.originProvince', 'travel.destinyProvince', 'travel.transport', 'travel.spot'] })

            return agendTravel;
        } catch (err) {
            return err.message;
        }
    }
}
