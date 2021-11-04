import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/users.repository";

export async function IsAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const usersRepository = getCustomRepository(
        UsersRepository
    ),
    token = request.headers.authorization,
    decodeToken = verify(token, process.env.JWT_SECRET) as JwtPayload;
    
    const { id } = decodeToken
    
    const isAdmin = await usersRepository
        .createQueryBuilder("user")
        .where("user.id = :id", { id: id })
        .getRawOne();

    const { user_id_perfil } = isAdmin;
    
    if(user_id_perfil == 1 || 2){
        return next(); 
       
    }
     return response.status(401)
        .json({
            message: 'Você não é Super Admin nem Admin'
        })
}