import { Spots } from './../models/Spots';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Spots)
export default class UsersRepository extends Repository<Spots> {}