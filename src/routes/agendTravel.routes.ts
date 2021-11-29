import { Router } from "express";
import AgendTravelsController from "../controllers/agendTravels/agendTravels.controller";
import CancelReserveController from "../controllers/agendTravels/cancelAgendTravel.controller";
import ListAllAgendTravelsController from "../controllers/agendTravels/listAllAgendTravels.controller";
import GetCanceledAgendTravelsController from "../controllers/agendTravels/getCanceledAgendTravels.controller";
import GetAgendTravelByReferenceController from '../controllers/agendTravels/getAgendTravelByReference.controller';
import { agendTravels } from "../middlewares/agendTavels.middlewere";

const router = Router();

const agendTravelController = new AgendTravelsController();
const cancelAgendTravelController = new CancelReserveController();
const listAllAgendTravelController = new ListAllAgendTravelsController();
const getCanceledTravelsController = new GetCanceledAgendTravelsController(); 
const getAgendTravelByReferenceController = new GetAgendTravelByReferenceController()

router.post('/client/travel/agend', agendTravels, agendTravelController.handle);
router.get('/client/travel/all', listAllAgendTravelController.handle);
router.put('/client/travel/cancel', cancelAgendTravelController.handle);
router.get('/client/travel/canceleds', getCanceledTravelsController.handle);
router.get('/client/travel/:reference', getAgendTravelByReferenceController.handle);

export default router;