import { EntityRepository, Repository } from 'typeorm';
import { Utilizadores } from '../models/Utilizadores';

@EntityRepository(Utilizadores)
export default class UsersRepository extends Repository<Utilizadores> {}