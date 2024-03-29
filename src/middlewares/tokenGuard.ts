import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
  }

export async function Auth(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;
    if(!authToken){
        return response.status(401)
            .json('O você não está autenticado!');
    }
    const [, token] = authToken.split(" ");
    try {
        verify(token, process.env.JWT_SECRET) as IPayload;
        return next();
    }catch(err) {
        return response.status(401).json({ errorCode: "token.expired" });
    }
}
