import { login } from './../middlewares/login';
import { createUser } from './../middlewares/createUser';
import Router from "express";
import { alterKey } from "../middlewares/alterKey";
import { alterProfileUser } from "../middlewares/alterProfileUser";
import AlterkeyController from "../controllers/users/alterKey.controller";
import DeleteUserController from "../controllers/users/deleteUser.controller";
import AlterIdUserControler from "../controllers/users/alterIdUser.controller";
import FindAllUsersController from "../controllers/users/findAllUser.controller";
import FindUsersByIdController from "../controllers/users/findUserById.controller";
import { UpdateUserController } from '../controllers/users/updateUser.controller';
import LoginController from "../controllers/users/login.controller";
import LogoutController from "../controllers/users/logout.controller";
import CreateUserController from "../controllers/users/createUser.controller";
import { IsSuperAdmin } from "../middlewares/isSuperAdmin";
import { Auth } from '../middlewares/tokenGuard';

const router = Router();

// const createUserController = new CreateUserController();
const alterKeyController = new AlterkeyController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const alterIdUserControler = new AlterIdUserControler();
const findUserByIdController = new FindUsersByIdController();
const findUserAllUserController = new FindAllUsersController();
const createUserController = new CreateUserController()
const loginController = new LoginController();
const logoutController = new LogoutController()

// router.post('/users/create', createUserController.handle);
// router.use(IsSuperAdmin)
router.get('/users/login', loginController.handle);
router.post('/users/create', createUser, createUserController.handle);
router.get('/users/all', Auth, findUserAllUserController.handle);
router.get('/users/all/:id', findUserByIdController.handle);
router.delete('/users/delete/:id', deleteUserController.handle);
router.put("/users/update", updateUserController.handle)
router.post('/users/edit/alterKey', alterKey, alterKeyController.handle);
router.post("/users/edit/profile", alterProfileUser, alterIdUserControler.handle);
router.get('/users/logout', logoutController.handle);

// exporting router
export default router;

