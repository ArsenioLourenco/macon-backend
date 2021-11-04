import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../@types';
import * as Yup from "yup";
import { showError } from '.';
import { ILogin } from '../services/users/login.service';

export const login = async (
  req: Request<ILogin>,
  res: Response<AppResponse<any>>,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Informe seu Email')
      .email(),
    password: Yup.string()
      .min(6, 'Senha demasiado curta')
      .trim()
      .required('A senha é obrigatória')
  });

  await showError(req, res, next, schema);
};