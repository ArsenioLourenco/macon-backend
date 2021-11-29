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
      .required('O numero do transporte não foi preenchido'),
      totalPlace: Yup.number()
      .required('O total de espaço do transporte não foi preenchido'),
     typeTransport: Yup.number()
      .required('O tipo de transporte não foi preenchido')
  })
  
  await showError(req, res, next, schema);
}


