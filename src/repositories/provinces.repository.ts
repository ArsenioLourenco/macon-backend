import { Provinces } from './../models/Provinces';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Provinces)
export default class ProvincesRepository extends Repository<Provinces> {}