import { IUsersIsAuthenticated } from './../@types/response';
import { Request, Response } from "express"

export async function isUsersAuthenticated(
    request: Request,
    response: Response<IUsersIsAuthenticated>,
) {
    const token = request.cookies.folhaDeRosto
    if(!token){
        return response.status(200)
            .json({error: false});
    }
    return response.status(200)
        .json({message: true})
}
