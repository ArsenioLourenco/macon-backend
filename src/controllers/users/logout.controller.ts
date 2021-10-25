import {  Request, Response } from "express";
import { AppResponse } from "../../@types";

export default class LogoutController {
    async handle(request: Request, response: Response<AppResponse<string>>) {
        try {
            response.cookie('maconBackEndInterdigitosDevs', '', { maxAge: 0 });
            return response
                .status(200)
                .send({
                    success: true,
                    message: "Logout was Success"
                });
        }
        catch(err){
            return response
                .status(200)
                .send({
                    success: false,
                    message: err.message
                })
        }
    }
}