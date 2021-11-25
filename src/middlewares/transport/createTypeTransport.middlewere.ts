import {NextFunction, Request, Response} from 'express';
import * as Yup from 'yup';
import { AppResponse } from "../../@types";
import { showError } from '..';
import { Transport } from "../../models/Transport";
import { ICreateTypeTransport } from '../../services/transport/createTypeTransport.service';
import { TypeTransport } from '../../models/TypeTransport';

export const createTypeTransport= async (
         req: Request<ICreateTypeTransport>,
         res: Response<AppResponse<TypeTransport[]>>,
         next: NextFunction
) => {
  const schema=  Yup.object().shape({
      typeName: Yup.string()
      .required('O nome do tipo de transport não foi preenchido'),
  })
  
  await showError(req, res, next, schema);
}


