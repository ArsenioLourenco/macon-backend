import Router from "express";
import { IsAdmin } from "../middlewares/isAdmin";
import { alterKey } from "../middlewares/alterKey";
import { updateUser } from "../middlewares/updateUser";
import { IsSuperAdmin } from "../middlewares/isSuperAdmin";
import { alterProfileUser } from "../middlewares/alterProfileUser";
import AlterkeyController from "../controllers/alterKey.controller";
import DeleteUserController from "../controllers/deleteUser.controller";
import AlterIdUserControler from "../controllers/alterIdUser.controller";
import FindAllUsersController from "../controllers/findAllUser.controller";
import FindUsersByIdController from "../controllers/findUserById.controller";
import { UpdateUserController } from '../controllers/updateUser.controller';

const router = Router();

// const createUserController = new CreateUserController();
const alterKeyController = new AlterkeyController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const alterIdUserControler = new AlterIdUserControler();
const findUserByIdController = new FindUsersByIdController();
const findUserAllUserController = new FindAllUsersController();

// router.post('/users/create', createUserController.handle);
router.use(IsAdmin)
router.get('/users/all', findUserAllUserController.handle);
router.get('/users/all/:id', findUserByIdController.handle);
router.use(IsSuperAdmin)
router.get('/users/all', findUserAllUserController.handle);
router.get('/users/all/:id', findUserByIdController.handle);
router.delete('/users/delete/:id', deleteUserController.handle);
router.put("/users/update", updateUser, updateUserController.handle)
router.post('/users/edit/alterKey', alterKey, alterKeyController.handle);
router.post("/users/edit/profile", alterProfileUser, alterIdUserControler.handle);

// exporting router
export default router;

