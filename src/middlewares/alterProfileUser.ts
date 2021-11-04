import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../@types';
import * as Yup from "yup";
import { showError } from '.';
import { IAlterProfile } from '../services/users/alterIdUser.service';

export const alterProfileUser = async (
  req: Request<IAlterProfile>,
  res: Response<AppResponse<any>>,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    idUser: Yup.string()
      .required('ID de usuario obrigatorio!'),
    idProfile: Yup.number()
        .default(1)
        .typeError('Novo Perfil de Usuário é Obrigatório!')
  });

  await showError(req, res, next, schema);
};