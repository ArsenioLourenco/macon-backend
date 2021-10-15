import { Request, Response, NextFunction } from "express";
import * as Yup from 'yup';
import { showError } from '.';
import { AppResponse } from "../@types";
import { Spots } from "../models/Spots";
import { ICreateSpot } from "../services/CreateSpot.service";

export const CreateCountryMiddleware = async (
    request: Request<ICreateSpot>,
    response: Response<AppResponse<Spots[]>>,
    next: NextFunction
)=>{
    const schema = Yup.object().shape({
        name: Yup.string()
            .required('Adicione um ponto...')
    });

    await showError(request, response, next, schema)
}