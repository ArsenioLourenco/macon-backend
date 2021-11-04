import Router from "express"
import CreateTravelsController from "../controllers/travels/createTravel.controller"
import DeleteAllTravelController from "../controllers/travels/deleteAllTravel.controller"
import DeleteTravelController from "../controllers/travels/deleteTravel.controller"
import GetAllTravelsController from "../controllers/travels/getAllTravels.controller"
import GetTravelsController from "../controllers/travels/getTravels.controller"
import UpdateTravelsController from "../controllers/travels/updateTravels.controller"
 
const router= Router();

const createTravelsController = new CreateTravelsController();
const deleteTravelController = new DeleteTravelController();
const getAllTravelController = new GetAllTravelsController();
const deleteAllTravelController = new DeleteAllTravelController();
const updateTravelsController = new UpdateTravelsController();
const getTravelsController = new GetTravelsController();

router.post("/travels/create", createTravelsController.handle);
router.delete("/travels/delete/:id", deleteTravelController.handle);
router.delete("/travels/all", deleteAllTravelController.handle);
router.get("/travels/all", getAllTravelController.handle);
router.put("/travels/update", updateTravelsController.handle);
router.get("/travels", getTravelsController.handle )

export default router