import { Travels } from "../../models/Travels";
import {NextFunction, Request, Response} from 'express';
import * as Yup from 'yup';
import { AppResponse } from "../../@types";
import { showError } from '..';
import {IcreateTravels} from "../../services/travels/createTravels.service"

export const createTravels= async (
         req: Request<IcreateTravels>,
         res: Response<AppResponse<Travels[]>>,
         next: NextFunction
) => {
  const schema=  Yup.object().shape({
    originProvince: Yup.number()
    .required('originProvince não foi inserido'),
    price: Yup.number()
    .required('price não foi inserido'),
    transportId: Yup.number()
    .required('transportId não foi inserido'),
    destinyProvince: Yup.number()
    .required('transportId não foi inserido'),
    departureDate: Yup.date()
    .required('departureDate  não foi inserido'),
    returnDate: Yup.date()
    .required('returnDate  não foi inserido')

  })
  
  await showError(req, res, next, schema);
}


