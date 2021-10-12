import {NextFunction, Request, Response} from 'express';
import * as Yup from 'yup';
import { showError } from '.';
import { AppResponse } from '../@types';
import { Utilizadores } from '../models/Utilizadores';
import { ICreateUser } from '../services/createUser.service';

export const createUser = async(
    req: Request<ICreateUser>,
    res: Response<AppResponse<Utilizadores[]>>,
    next: NextFunction
) => {
    const schema = Yup.object().shape({
        username: Yup.string()
            .required('Informe o nome do usuário'),
        password: Yup.string()
            .required('Informe a Password')
            .min(6, 'O minimo de caracteres da pass deve ser 6')
            .max(16, 'O maximo de caracteres da pass deve ser 16'),
        email: Yup.string()
            .required('O email é Obrigatorio')
            .email('Email inválido!')
    });
    await showError(req, res, next, schema);
};
