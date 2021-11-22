import { getCustomRepository } from "typeorm";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";
import PaymentRepository from "../../repositories/payment.repository";
import crypto from "crypto"

export interface ICreatePayment {
    status: string,
    agendTravelCode: number
}

export default class CreatePayment {
    async execute({ status, agendTravelCode }: ICreatePayment) {
        const paymentRepository = getCustomRepository(PaymentRepository),
            agendTravelRepository = getCustomRepository(AgendTravelsRepository),
            findAgendTravel = await agendTravelRepository.findOne({ where: { id: agendTravelCode } })


        try {
            if (findAgendTravel) {
                const reference = crypto.randomBytes(7).toString('hex'),
                    createPayment = await paymentRepository
                        .createQueryBuilder()
                        .insert()
                        .values({
                            paymentReference: reference,
                            status,
                            agendTravelCode: findAgendTravel
                        })
                        .execute();
                return createPayment
            }

        }
        catch (err) {
            return err.message
        }
    }
}



