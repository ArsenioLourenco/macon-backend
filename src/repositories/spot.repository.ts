import { EntityRepository, Repository } from 'typeorm';
import { Spots } from '../models/Spots';

@EntityRepository(Spots)
export default class SpotRepository extends Repository<Spots>{

}