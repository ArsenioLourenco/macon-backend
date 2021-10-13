import { AgendTravels } from './../models/AgendTravels';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AgendTravels)
export default class AgendTravelsRepository extends Repository<AgendTravels> {}