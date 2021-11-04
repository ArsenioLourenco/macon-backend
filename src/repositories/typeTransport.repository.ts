import { TypeTransport } from '../models/TypeTransport';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TypeTransport)
export default class TypeTransportRepository extends Repository<TypeTransport> {}