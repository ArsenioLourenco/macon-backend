import { Countries } from '../models/Countries';
import { Provinces } from '../models/Provinces';
import { Spots } from '../models/Spots';
export interface ICreateCountry{
    id: Countries,
    name: Countries,
    region: Countries
    code: Countries
}
export interface ICreateProvince{
    id: Provinces,
    name: Provinces,
    region: Provinces,
    code: Provinces,
    countryID: Provinces
}
export interface ICreateSpot{
    id: Spots,
    name: Spots,
    description: Spots,
    location: Spots,
    contacts: Spots,
    provinceID: Spots
}
export interface IUsersIsAuthenticated{
    error?: string | boolean,
    message?: string | boolean
}
export interface IDelete{
    id: number
}

export type UserTypes = 'Super Admin' | 'Administrador' | 'Normal';
