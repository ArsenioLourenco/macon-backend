import { string } from 'yup/lib/locale';
import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppResponse } from '../../@types';
import Login, { ILogin } from '../../services/users/login.service';

interface ILoginUser {
    email: string,
    password: string
}

export default class LoginController {
    async handle(request: Request<ILoginUser>, response: Response) {
        try {
            const { email, password } = request.body;
            const loginService = new Login();
            const verifyUserExist = await loginService.execute({ email });

            if (verifyUserExist) {
                const userPassword = verifyUserExist['password'];
                const passwordCompare = await compare(
                    password,
                    userPassword
                );

                if (!passwordCompare) {
                    return response.status(400)
                        .json({
                            success: false,
                            message: 'Incorrect Username/Password',
                        });
                }
                const token = sign(
                    {
                        id: verifyUserExist.id,
                        email: verifyUserExist.email,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1d",
                    }
                );
                return response.status(200)
                    .json({
                        success: true,
                        message: 'Authenticated User',
                        data: token
                    });
            }
            else {
                return 'This user not Exists';
            }
        } catch (err) {
            return response.json({
                success: false,
                message: err.message
            })

        }
    }
}