import { Router, Request, Response } from 'express';
import { Auth } from './middlewares/tokenGuard';
import { isUsersAuthenticated } from './middlewares/isAuthenticated';
import usersRoutes from "./routes/users.routes";
import transportRoutes from "./routes/transport.routes";
import SendSMS from './services/sendSMS/sendSMS.service';
import LoginController from './controllers/users/login.controller';
import { login } from './middlewares/login';
// Router Instance
const router = Router();
const sendSMS = new SendSMS();

const loginController = new LoginController()
// base Route
router.get('/', (__, res) => {
    res.send({
        app: 'macon-backend',
        versao: 'v0.1.0',
        autor: "©2021 Interdigitos LDA",
        erro: '0x000001',
        msg_erro: 'Nenhum parametro foi aplicado.',
        note: "Trainess Codando..."
    });
});
// isUserAuthenticated
router.get('/users/isAuthenticated', isUsersAuthenticated);
router.post('/users/login', login, loginController.handle);
// Routes with Restriction
router.use(Auth);
// Users Routes
router.use(usersRoutes);
// Transports Routes
router.use(transportRoutes);
export default router;