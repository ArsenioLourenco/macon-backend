import { Router } from 'express';
import { updateUser } from '../middlewares/updateUser';
import { alterKey } from '../middlewares/alterKey';
import { UpdateUserController } from './../controllers/updateUser.controller';
import { alterProfileUser } from '../middlewares/alterProfileUser';
import AlterkeyController from '../controllers/alterKey.controller';
import DeleteUserController from '../controllers/deleteUser.controller';
import AlterIdUserControler from '../controllers/alterIdUser.controller';
import FindAllUsersController from '../controllers/findAllUser.controller';
import FindUsersByIdController from '../controllers/findUserById.controller';
import { IsSuperAdmin } from '../middlewares/isSuperAdmin';
import { isUsersAuthenticated } from '../middlewares/isAuthenticated';


const router = Router()

// controllers
const deleteUserController = new DeleteUserController();
const alterKeyController = new AlterkeyController();
const alterIdUserControler = new AlterIdUserControler();
const updateUserController = new UpdateUserController();
const findUserAllUserController = new FindAllUsersController();
const findUserByIdController = new FindUsersByIdController();

router.use(IsSuperAdmin)
// router.use(isUsersAuthenticated)
router.get('/users/isAuthenticated', isUsersAuthenticated);
router.get('/users/all', findUserAllUserController.handle);
router.get('/users/all/:id', findUserByIdController.handle);
router.delete('/users/delete/:id', deleteUserController.handle);
router.post('/users/edit/alterKey', alterKey, alterKeyController.handle);
router.post("/users/edit/profile", alterProfileUser, alterIdUserControler.handle);
router.put("/users/update", updateUser, updateUserController.handle)

export default router;