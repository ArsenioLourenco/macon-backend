import { Countries } from './../models/Countries';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Countries)
export default class CountriesRepository extends Repository<Countries> {}