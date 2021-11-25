import { Travels } from "../../models/Travels";
import {NextFunction, Request, Response} from 'express';
import * as Yup from 'yup';
import { AppResponse, IDelete } from "../../@types";
import { showError } from '.';


export const byIDTravel= async (
         req: Request<IDelete>,
         res: Response<AppResponse<Travels[]>>,
         next: NextFunction
) => {
  const schema=  Yup.object().shape({
    id: Yup.number()
    .required('id é um número'),
  })
  
  await showError(req, res, next, schema);
}

