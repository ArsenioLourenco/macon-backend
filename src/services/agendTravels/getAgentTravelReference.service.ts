import { getCustomRepository } from "typeorm";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";
export interface IAgendTravelReference {
    reference: string;
}
export default class AgendTravelReferenceService {
    async execute({ reference }: IAgendTravelReference) {
        try {
            const agendTravelRepository = getCustomRepository(AgendTravelsRepository);
            const agendTravel = await agendTravelRepository.findOne({
                where: [{ phoneNumber: reference }, { personalCodeAgend: reference }],
                relations: ['travel', 'travel.originProvince', 'travel.destinyProvince', 'travel.transport', 'travel.spot', 'travel.spot.province']
            });
            return agendTravel;
        } catch (err) {
            return err.message;
        }
    }
}
