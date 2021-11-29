import { getCustomRepository } from "typeorm";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";

export interface IAgendTravelContactReference {
    contactReference: string;
}

export default class AgendTravelContactReferenceService {
    async execute({ contactReference }: IAgendTravelContactReference) {

        try {
            const agendTravelRepository = getCustomRepository(AgendTravelsRepository)

            const agendTravel = await agendTravelRepository.findOne({ where: [{ phoneNumber: contactReference }, { userAgendCode: contactReference }], relations: ['travel', 'travel.originProvince', 'travel.destinyProvince', 'travel.transport', 'travel.spot'] })

            return agendTravel;
        } catch (err) {
            return err.message;
        }
    }
}
