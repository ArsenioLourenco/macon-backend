import { Profile } from "../models/Profile";
import { Users } from "../models/Users";

// export interface IUsers{
//     id: Utilizadores,
//     username: Utilizadores,
//     password: Utilizadores,
//     email: Utilizadores,
//     idUser: Utilizadores,
//     idProfile: PerfilUtilizador
// }

export interface IUsersIsAuthenticated{
    error?: string | boolean,
    message?: string | boolean
}

export type UserTypes = 'Super Admin' | 'Administrador' | 'Normal';
