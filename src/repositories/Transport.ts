import { EntityRepository, Repository } from 'typeorm';
import { Transport } from '../models/Transport';

@EntityRepository(Transport)
export default class TransportRepository extends Repository<Transport> {}