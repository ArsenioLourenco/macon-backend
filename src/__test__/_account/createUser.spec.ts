import { response } from "express";
import CreateUserController from "../../controllers/users/createUser.controller";
import { Users } from "../../models/Users";
import CreateUser, { ICreateUser } from "../../services/users/registerAdmin.service"

describe("Cadastro", () => {
    it("Administrador", async() => {
        const createAdmin = new CreateUser();
        const createAdminContr = new CreateUserController();
        const userData= {
            BI: '006989589LA042',
            password: 'teste1234567',
            email: 'test@gmail.com',
            profileId: 1,
            phoneNumber: '244945323281'
        } as ICreateUser;
        const creatingUser = await createAdmin.execute(userData);
        expect(creatingUser.email).toBe("test@gmail.com");
    })
})