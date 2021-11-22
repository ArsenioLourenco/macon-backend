import { Request, Response } from "express";
import CreatePayment from "../../services/payment/createPayment.service";

export default class CreatePaymentController {
    async handle(request: Request, response: Response) {
        const { status, agendTravelCode } = request.body,
            createPayment = new CreatePayment();
        try {
            const Payment = await createPayment.execute({ status, agendTravelCode });

            if (Payment) {
                return response.status(200)
                    .json({
                        success: true,
                        message: 'pagamento feito',
                        data: Payment
                    })
            }
            else {
                return response.status(400)
                    .json({
                        success: false,
                        message: 'Não temos esse agendamento',
                        data: Payment
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

