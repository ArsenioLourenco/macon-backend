import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../@types';
import * as Yup from "yup";
import { showError } from '.';
import { IUpdate } from '../services/updateUser.service';

export const updateUser = async (
  req: Request<IUpdate>,
  res: Response<AppResponse<any>>,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    // userName: Yup.string()
    // .required('Enter New Username'),
    // eMail: Yup.string()
    //     .required('Enter New email')

  });

  await showError(req, res, next, schema);
};