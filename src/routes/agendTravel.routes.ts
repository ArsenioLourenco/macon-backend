import { Router } from "express";
import AgendTravelsController from "../controllers/agendTravels/agendTravels.controller";
import CancelReserveController from "../controllers/agendTravels/cancelAgendTravel.controller";
import ListAllAgendTravelsController from "../controllers/agendTravels/listAllAgendTravels.controller";
import GetCancelledAgendTravelsController from "../controllers/agendTravels/getCancelledAgendTravels.controller";
import GetAgendTravelByReferenceController from '../controllers/agendTravels/getAgendTravelByReference.controller';
import { agendTravels } from "../middlewares/agendTavels.middlewere";

const router = Router();

const agendTravelController = new AgendTravelsController();
const cancelAgendTravelController = new CancelReserveController();
const listAllAgendTravelController = new ListAllAgendTravelsController();
const getCancelledTravelsController = new GetCancelledAgendTravelsController(); 
const getAgendTravelByReferenceController = new GetAgendTravelByReferenceController()

router.post('/client/travel/agend', agendTravels, agendTravelController.handle);
router.get('/client/travel/all', listAllAgendTravelController.handle);
router.put('/client/travel/cancel', cancelAgendTravelController.handle);
router.get('/client/travel/cancelled', getCancelledTravelsController.handle);
router.get('/client/travel/:reference', getAgendTravelByReferenceController.handle);

export default router;