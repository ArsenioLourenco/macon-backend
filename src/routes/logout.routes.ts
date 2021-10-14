import LogoutController from "../controllers/users/logout.controller";
import { Router } from "express";

const router = Router();

const logoutController = new LogoutController();

router.get('/users/logout', logoutController.handle)


export default router;