import { Provinces } from './../models/Provinces';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Provinces)
export default class UsersRepository extends Repository<Provinces> {}