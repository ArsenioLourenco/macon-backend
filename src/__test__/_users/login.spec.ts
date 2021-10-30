import { response } from "express";
import Login from "../../services/users/login.service"

describe("Autenticacao", () => {
    it("login", async () => {
        const loginService = new Login();
        const userLoginData = {
            email: "teste@gmail.com",
            password: "teste123456"
        };
        const testLogin = await loginService.execute(userLoginData);
        expect(response).toBe(testLogin.token);
    })
})