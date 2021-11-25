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
    .required('OriginProvince não foi preenchido'),
    price: Yup.number()
    .required('Price não foi preenchido'),
    transportId: Yup.number()
    .required('TransportId não foi preenchido'),
    destinyProvince: Yup.number()
    .required('TransportId não foi preenchido'),
    departureDate: Yup.date()
    .required('DepartureDate  não foi preenchido'),
    returnDate: Yup.date()
    .required('ReturnDate  não foi preenchido')

  })
  
  await showError(req, res, next, schema);
}


