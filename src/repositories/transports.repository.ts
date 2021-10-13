import { EntityRepository, Repository } from 'typeorm';
import { Tranpsort } from '../models/Tranpsort';

@EntityRepository(Tranpsort)
export default class TransportRepository extends Repository<Tranpsort> {}