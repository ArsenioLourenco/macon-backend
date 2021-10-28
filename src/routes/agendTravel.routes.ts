import { Router } from "express";
import AgendTravelsController from "../controllers/agendTravels/agendTravels.controller";

const router = Router();

const agendTravelController = new AgendTravelsController();

router.post('/client/Travel/agend', agendTravelController.handle);

export default router;