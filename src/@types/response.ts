export interface IUsersIsAuthenticated{
    error?: string | boolean,
    message?: string | boolean
}
export interface IDelete{
    id: number
}

export type UserTypes = 'Super Admin' | 'Administrador' | 'Normal';
