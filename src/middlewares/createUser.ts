import { Users } from './../models/Users';
import {NextFunction, Request, Response} from 'express';
import * as Yup from 'yup';
import { showError } from '.';
import { AppResponse } from '../@types';
import { ICreateUser } from '../services/users/registerAdmin.service';

export const createUser = async(
    req: Request<ICreateUser>,
    res: Response<AppResponse<Users[]>>,
    next: NextFunction
) => {
    const schema = Yup.object().shape({
        BI: Yup.string()
            .required('Seu BI é Obrigatório!'),
        password: Yup.string()
            .required('Informe a Password')
            .min(6, 'O minimo de caracteres da pass deve ser 6')
            .max(16, 'O maximo de caracteres da pass deve ser 16'),
        email: Yup.string()
            .required('Informe seu email é obrigatório')
            .email('Email inválido!'),
        profileId: Yup.string()
            .required('O perfil do Usuário é Obrigatório!')
    });
    await showError(req, res, next, schema);
};
