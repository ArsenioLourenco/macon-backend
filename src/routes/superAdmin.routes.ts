import { Router } from 'express';
import { alterKey } from '../middlewares/alterKey';
import { UpdateUserController } from './../controllers/users/updateUser.controller';
import { alterProfileUser } from '../middlewares/alterProfileUser';
import AlterkeyController from '../controllers/users/alterKey.controller';
import DeleteUserController from '../controllers/users/deleteUser.controller';
import AlterIdUserControler from '../controllers/users/alterIdUser.controller';
import FindAllUsersController from '../controllers/users/findAllUser.controller';
import FindUsersByIdController from '../controllers/users/findUserById.controller';
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


export default router;