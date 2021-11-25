import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import PaymentRepository from "../../repositories/payment.repository";

export default class GetPaymentController {
    async handle(request: Request, response: Response) {
        try {
            const paymentRepository = getCustomRepository(PaymentRepository),
                payment = await paymentRepository.find({relations:['agendTravelCode']});

            if (payment) {
                return response.status(200)
                    .json({
                        success: true,
                        data: payment
                    })
            }
            else {
                return response.status(400)
                    .json({
                        success: false,
                        message: 'não tem pagamento'
                    })
            }
        }

        catch (err) {
            return response.status(500)
                .json({
                    success: false,
                    message: err.message
                })
        }
    }
}