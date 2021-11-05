import {EntityRepository, Repository} from 'typeorm';
import {Countries} from '../models/Countries';

@EntityRepository(Countries)
export default class CountryRepository extends Repository<Countries>{}