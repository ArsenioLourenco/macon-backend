import Router from "express";
import agendTravelRoutes from "../routes/agendTravel.routes";
import GetAllTravelsController from "../controllers/travels/getAllTravels.controller";

const router = Router();

const getAllTravelController = new GetAllTravelsController();

router.get("/travels/client/list", getAllTravelController.handle);
router.use(agendTravelRoutes);

export default router;