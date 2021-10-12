import { Router } from "express";
import { login } from "../middlewares/login";
import { createUser } from "../middlewares/createUser";
import LoginController from "../controllers/login.controller";
import LogoutController from "../controllers/logout.controller";
import CreateUserController from "../controllers/createUser.controller";


const router = Router();
// controller
const loginController = new LoginController();
const createUserController = new CreateUserController();
const logoutController= new LogoutController(); 

//authLoginRoute
router.post('/users/create',createUser, createUserController.handle);
router.post('/users/login', login, loginController.handle);
router.get('/users/logout', logoutController.handle)


export default router; 