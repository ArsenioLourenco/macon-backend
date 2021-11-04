import { Travels } from './../models/Travels';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Travels)
export default class TravelsRepository extends Repository<Travels> {}