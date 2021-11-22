import { Router } from "express";
import AgendTravelsController from "../controllers/agendTravels/agendTravels.controller";
import CancelReserveController from "../controllers/agendTravels/cancelAgendTravel.controller";
import GetAgendTravelByPersonalCodeController from "../controllers/agendTravels/getAgendTravelByPersonalCode.controller";
import GetAgendTravelByPhoeNumberController from "../controllers/agendTravels/getAgendTravelByPhoneNumber.controller";
import GetCanceledAgendTravelsController from "../controllers/agendTravels/getCanceledAgendTravels.controller";
import ListAllAgendTravelsController from "../controllers/agendTravels/listAllAgendTravels.controller";
import { agendTravels } from "../middlewares/agendTavels.middlewere";

const router = Router();

const agendTravelController = new AgendTravelsController();
const cancelAgendTravelController = new CancelReserveController();
const listAllAgendTravelController = new ListAllAgendTravelsController();
const getCanceledTravelsController = new GetCanceledAgendTravelsController(); 
const getAgendTravelByPhoneNumber = new GetAgendTravelByPhoeNumberController();
const getAgendTravelByPersonalCodeController = new GetAgendTravelByPersonalCodeController();

router.post('/client/travel/agend', agendTravels, agendTravelController.handle);
router.get('/client/travel/all', listAllAgendTravelController.handle);
router.put('/client/travel/cancel', cancelAgendTravelController.handle);
router.get('/client/travel/canceleds', getCanceledTravelsController.handle);
router.get('/client/travel/:phoneNumber', getAgendTravelByPhoneNumber.handle);
router.get('/client/travel/personalCode', getAgendTravelByPersonalCodeController.handle);


export default router;