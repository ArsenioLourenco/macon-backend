import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../@types';
import * as Yup from "yup";
import { showError } from '.';
import { ILogin } from '../services/login.service';

export const login = async (
  req: Request<ILogin>,
  res: Response<AppResponse<any>>,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    username: Yup.string()
      .required('Informe o Nome de Usuário'),
    password: Yup.string()
      .min(6, 'Senha demasiado curta')
      .trim()
      .required('A senha é obrigatória')
  });

  await showError(req, res, next, schema);
};