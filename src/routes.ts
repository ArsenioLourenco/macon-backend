import { Router } from 'express';
import { Auth } from './middlewares/tokenGuard';
import { isUsersAuthenticated } from './middlewares/isAuthenticated';
import usersRoutes from "./routes/users.routes";
import transportRoutes from "./routes/transport.routes";
import agendTravelRoutes from "./routes/agendTravel.routes";
import SendSMS from './services/sendSMS/sendSMS.service';
import LoginController from './controllers/users/login.controller';
import { login } from './middlewares/login';
import SendEMAIL from './services/email/sendEMAIL.service';
import GetAllTravelsController from './controllers/travels/getAllTravels.controller';
import GetProvincesController from "./controllers/location/province/getAllProvinces.controller";
import GetCountriesController from "./controllers/location/country/getAllCountries.controller";
import travelsRoutes from "./routes/travels.routes"
import GetTravelsController from './controllers/travels/getTravels.controller';
import GetByIdTravelsController from './controllers/travels/getByIdTravel.controller';
 import {getTravels} from './middlewares/travel/getTravel.middleware'
 import locationRoutes from './routes/location.routes';
 import GetPaymentController from "./controllers/payment/getPayment.controller"


const router = Router();
const sendSMS = new SendSMS();
const loginController = new LoginController();
const getAllTravelController = new GetAllTravelsController();
const getAllProvinceController = new GetProvincesController();
const getAllCountriesController = new GetCountriesController();
const getTravelsController = new GetTravelsController();
const getByIdTravelController = new GetByIdTravelsController();
const getPaymentController= new GetPaymentController();

router.get('/', async (__, res) => {
    res.send({
        app: 'macon-backend',
        versao: 'v0.1.0',
        autor: "©2021 Interdigitos LDA",
        erro: '0x000001',
        msg_erro: 'Nenhum parametro foi aplicado.',
        note: "Trainess Codando..."
    });
});
router.get("/provinces/list/:id", getAllProvinceController.handle);
router.get('/countries/list', getAllCountriesController.handle);
router.get("/travels/list", getAllTravelController.handle);
router.get("/travels/byId/:id", getByIdTravelController.handle);
router.get("/travels/:originProvince/:destinyProvince/:departureDate/:returnDate?",getTravels, getTravelsController.handle )
router.get("/payment/:id", getPaymentController.handle)
router.use(agendTravelRoutes);
router.get('/users/isAuthenticated', isUsersAuthenticated);
router.post('/users/login', login, loginController.handle);
router.use(Auth);
router.use(locationRoutes);
router.use(usersRoutes);
router.use(travelsRoutes);
router.use(transportRoutes);
router.use(agendTravelRoutes);

export default router;