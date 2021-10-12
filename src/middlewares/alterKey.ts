import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../@types';
import * as Yup from "yup";
import { showError } from '.';
import { IAlterKey } from '../services/alterKey.service';

export const alterKey = async (
  req: Request<IAlterKey>,
  res: Response<AppResponse<any>>,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    id: Yup.string()
        .required('Precisa Informar o id da Pessoa'),
    newKey: Yup.string()
        .min(6, 'Senha demasiado curta')
        .max(16, 'Senha demasiado longa')
        .required('Informe a Nova senha'),
    confirmNewKey: Yup.string()
        .min(6, 'Senha demasiado curta')
        .max(16, 'Senha demasiado longa')
        .required('Confirme a nova senha'),
  });

  await showError(req, res, next, schema);
};