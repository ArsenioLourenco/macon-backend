import { Travels } from "../../models/Travels";
import {NextFunction, Request, Response} from 'express';
import * as Yup from 'yup';
import { AppResponse } from "../../@types";
import { showError } from '.';
import { IGetTravel } from "../../controllers/travels/getTravels.controller";

export const getTravels= async (
         req: Request<IGetTravel>,
         res: Response<AppResponse<Travels[]>>,
         next: NextFunction
) => {
  const schema=  Yup.object().shape({
    originProvince: Yup.number()
    .required('A origem  é um campo obrigatório'),
    destinyProvince: Yup.number()
    .required('O destino é um campo obrigatório'),
    departureDate: Yup.date()
    .required('A data de partida é um campo obrigatório'),
  })
  
  await showError(req, res, next, schema);
}

