import { Travels } from "../../models/Travels";
import {NextFunction, Request, Response} from 'express';
import * as Yup from 'yup';
import { AppResponse } from "../../@types";
import { showError } from '.';
import { IGetTravel } from "../../controllers/travels/getTravels.controller";

export const createTravels= async (
         req: Request<IGetTravel>,
         res: Response<AppResponse<Travels[]>>,
         next: NextFunction
) => {
  const schema=  Yup.object().shape({
    originProvince: Yup.number()
    .required('originProvince é um número'),
    destinyProvince: Yup.number()
    .required('destinyProvince é um número'),
    departureDate: Yup.date()
    .default(function () {
      return new Date()})
    .required('departureDate é uma data'),
    returnDate: Yup.date()
    .default(function () {
      return new Date()})
    .required('returnDate é uma data')
  })
  
  await showError(req, res, next, schema);
}

