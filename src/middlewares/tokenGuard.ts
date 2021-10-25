import { Request, Response, NextFunction } from "express"

export async function Auth(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const token = request.cookies.maconBackEndInterdigitosDevs
    if(!token){
        return response.status(401)
            .send('O você não está autenticado!');
    }
    return next();
}
