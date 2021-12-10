import { getCustomRepository } from "typeorm";
import AgendTravelsRepository from "../../repositories/agendTravels.repository";
import PaymentRepository from "../../repositories/payment.repository";
import crypto from "crypto"

export interface ICreatePayment {
	status: string,
	agendTravelCode: number;
	reference: string;
}

export default class CreatePayment {
	async execute({ status, agendTravelCode, reference }: ICreatePayment) {
		const paymentRepository = getCustomRepository(PaymentRepository),
			agendTravelRepository = getCustomRepository(AgendTravelsRepository),
			findAgendTravel = await agendTravelRepository.findOne({ where: { id: agendTravelCode } })
		try {
			if (findAgendTravel) {
					const payment = await paymentRepository
						.createQueryBuilder()
						.insert()
						.values({
							paymentReference: reference,
							status: 'Pending',
							agendTravelCode: findAgendTravel
						})
						.execute();
				return payment
			}
		}
		catch (err) {
			return err.message
		}
	}
}



