import { EntityRepository, Repository } from 'typeorm';
import { Provinces } from '../models/Provinces';

@EntityRepository(Provinces)
export default class ProvinceRepository extends Repository<Provinces>{

}