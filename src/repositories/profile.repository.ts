import { Profile } from './../models/Profile';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Profile)
export default class ProfileRepository extends Repository<Profile> {}