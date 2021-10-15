import { Request, Response, NextFunction } from "express";
import * as Yup from 'yup';
import { showError } from '.';
import { AppResponse } from "../../@types";
import { Countries } from "../../models/Countries";
import { ICreateCountry } from "../../services/location/CreateCountry.service";
export const CreateCountryMiddleware = async (
    request: Request<ICreateCountry>,
    response: Response<AppResponse<Countries[]>>,
    next: NextFunction
)=>{
    const schema = Yup.object().shape({
        name: Yup.string()
            .required('Adicione um pais...')
    });

    await showError(request, response, next, schema)
}