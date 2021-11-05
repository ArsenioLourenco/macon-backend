import { Router } from 'express';
import { Auth } from './middlewares/tokenGuard';
import { isUsersAuthenticated } from './middlewares/isAuthenticated';
import locationRoute from './routes/location/location.route'
import usersRoutes from "./routes/users.routes";
import transportRoutes from "./routes/transport.routes";
import agendTravelRoutes from "./routes/agendTravel.routes";
import SendSMS from './services/sendSMS/sendSMS.service';
import LoginController from './controllers/users/login.controller';
import { login } from './middlewares/login';
import SendEMAIL from './services/email/sendEMAIL.service';
import GetAllTravelsController from './controllers/travels/getAllTravels.controller';

const router = Router();
const sendSMS = new SendSMS();

const loginController = new LoginController();
const getAllTravelController = new GetAllTravelsController();

import travelsRoutes from "./routes/travels.routes"

router.get('/', async (__, res) => {
    res.send({
        app: 'macon-backend',
        versao: 'v0.1.0',
        autor: "©2021 Interdigitos LDA",
        erro: '0x000001',
        msg_erro: 'Nenhum parametro foi aplicado.',
        note: "Trainess Codando..."
    });
    // const sendEmail = new SendEMAIL();
    // // await sendEmail.execute(
    // //     { destiny: "luiscaputo15@gmail.com", message: "Testando envio de Email"}
    // // );
});

router.get("/travels/list", getAllTravelController.handle);
router.use(agendTravelRoutes);
router.get('/users/isAuthenticated', isUsersAuthenticated);
router.post('/users/login', login, loginController.handle);
router.use(locationRoute)
router.use(Auth);
router.use(locationRoute)
router.use(usersRoutes);
router.use(travelsRoutes)
router.use(transportRoutes);
router.use(agendTravelRoutes);

export default router;
 
