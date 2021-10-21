import { Request, Response, NextFunction } from "express";
import * as Yup from 'yup';
import { showError } from '.';
import { AppResponse } from "../../@types";
import { Provinces } from "../../models/Provinces";
import { ICreateProvince } from "../../services/location/createProvince.service";
export const CreateProvinceMiddleware = async (
    request: Request<ICreateProvince>,
    response: Response<AppResponse<Provinces[]>>,
    next: NextFunction
)=>{
    const schema = Yup.object().shape({
        name: Yup.string()
            .required('Adicione uma Provincia...')
    });

    await showError(request, response, next, schema)
}