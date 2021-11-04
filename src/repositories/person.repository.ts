import { Person } from './../models/Person';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Person)
export default class PersonRepository extends Repository<Person> {}