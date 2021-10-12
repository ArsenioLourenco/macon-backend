import {  Response } from "express";
import { AppResponse } from "../@types";

export default class LogoutController {
    async handle(response:Response<AppResponse<string>>) {
        try {
            response.cookie('folhaDeRosto', '', { maxAge: 0 });
            return response.status(200).json({
                    success: true,
                    message: "Logout Succesffully"
                })
        }

        catch(err){
            return response .json({
                    success: false,
                    message: err.message
                })
        }
    }
}