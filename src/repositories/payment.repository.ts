import { Payment } from './../models/Payment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Payment)
export default class PaymentRepository extends Repository<Payment> {}