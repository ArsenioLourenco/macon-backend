import { Request, Response } from 'express';
import { AppResponse } from '../../@types';
import Login, { ILogin } from '../../services/users/login.service';

export default class LoginController{
    async handle(request: Request<ILogin>, response: Response<AppResponse<string>>){
        const { email, password } = request.body;
        try{
            const loginService = new Login();
            const auth = await loginService.execute({
                email, 
                password
            });

            // response.cookie("maconBackEndInterdigitosDevs", auth, {
            //     maxAge: 86400000
            // });

            return response.status(200)
                .json({
                    success: true,
                    message: 'Authenticated User',
                    data: auth
                });
        }catch(err){
            // return response.send(e)
              return response.json({
                    success: false,
                    message: err.message
                })
                
        }
    }
}