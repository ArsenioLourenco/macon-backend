import { PerfilUtilizador } from './../models/PerfilUtilizador';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PerfilUtilizador)
export default class ProfileUserRepository extends Repository<PerfilUtilizador> {}