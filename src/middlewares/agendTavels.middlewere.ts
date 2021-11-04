import {NextFunction, Request, Response} from 'express';
import * as Yup from 'yup';
import { showError } from '.';
import { AppResponse } from '../@types';
import { AgendTravels } from '../models/AgendTravels';
import { IAgendTravel } from '../services/agendTravels/agendTravel.service';

export const agendTravels = async(
    req: Request<IAgendTravel>,
    res: Response<AppResponse<AgendTravels[]>>,
    next: NextFunction
) => {
    const schema = Yup.object().shape({
        placesReserve: Yup.number()
            .required('Informe Uma Quantidade de Lugares.'),
        travelId: Yup.number()
            .required('Preisa Informar o identificador do Trajecto!'),
        phoneNumber: Yup.string()
            .required('Informe seu Número de telefone!')
    });
    await showError(req, res, next, schema);
};
