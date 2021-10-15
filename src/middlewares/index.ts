import { Request, Response, NextFunction } from "express";
import { AppResponse } from "../@types";
import * as Yup from 'yup';


export const showError = async (
    request: Request<any>,
    respond: Response<AppResponse<string>>,
    next: NextFunction,
    schema: any
) => {
    try {
        await schema.validate(request.body);

        next();
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            return respond.json({ success: false, message: err.message });
        }

        return respond.json({ success: false, message: 'Falha ao processar a requisição' });
    }
};