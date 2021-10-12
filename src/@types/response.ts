import { PerfilUtilizador } from "../models/PerfilUtilizador";
import { Utilizadores } from "../models/Utilizadores";

export interface IUsers{
    id: Utilizadores,
    username: Utilizadores,
    password: Utilizadores,
    email: Utilizadores,
    idUser: Utilizadores,
    idProfile: PerfilUtilizador
}

export interface IUsersIsAuthenticated{
    error?: string | boolean,
    message?: string | boolean
}

export type UserTypes = 'Super Admin' | 'Administrador' | 'Normal';
