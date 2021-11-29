import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import PaymentRepository from "../../repositories/payment.repository";

export default class DeletePaymentController {
    async handle(request: Request, response: Response) {
        const {id} = request.params,
              paymentRepository= getCustomRepository(PaymentRepository),
              today= new Date();
        try {
            const payment = await paymentRepository.findOne(id)
              
            if (payment.deletetAt===null) {
                const deletedPayment= await paymentRepository
                .createQueryBuilder()
                .update()
                .set({ deletetAt: today })
                .where("id = :id", { id: id })
                .execute();
                return response.status(200)
                    .json({
                        success: true,
                        message: 'pagamento deletado',
                        data: deletedPayment
                    })
            }
            else{
                return response.status(400)
                .json({
                    success: false,
                    message: 'Este pagamento já foi deletado'
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

