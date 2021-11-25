import {NextFunction, Request, Response} from 'express';
import * as Yup from 'yup';
import { AppResponse } from "../../@types";
import { showError } from '..';
import { ICreateTransport } from "../../services/transport/createTransport.service";
import { Transport } from "../../models/Transport";

export const createTransport= async (
         req: Request<ICreateTransport>,
         res: Response<AppResponse<Transport[]>>,
         next: NextFunction
) => {
  const schema=  Yup.object().shape({
      transportNumber: Yup.number()
      .required('o numero do transporte não foi inserido'),
      totalPlace: Yup.number()
      .required('o total de espaço do transporte não foi inserido'),
     typeTransport: Yup.number()
      .required('o tipo de transporte não foi inserido')
  })
  
  await showError(req, res, next, schema);
}


