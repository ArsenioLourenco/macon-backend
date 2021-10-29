import Router from "express"
import CreateTravelsController from "../controllers/travels/createTravel.controller"
import DeleteAllTravelController from "../controllers/travels/deleteAllTravel.controller"
import DeleteTravelController from "../controllers/travels/deleteTravel.controller"
import GetAllTravelsController from "../controllers/travels/getAllTravels.controller"
import UpdateTravelsController from "../controllers/travels/updateTravels.controller"
 

const router= Router()

const getAllTravelsController= new GetAllTravelsController()
const createTravelsController= new CreateTravelsController()
const deleteTravelController= new DeleteTravelController()
const deleteAllTravelController= new DeleteAllTravelController()
const updateTravelController= new UpdateTravelsController()

router.get("/travel/all", getAllTravelsController.handle)
router.post("/create/travel", createTravelsController.handle)
router.delete("/travel/delete/:id",deleteTravelController.handle)
router.delete("/travel/all/delete", deleteAllTravelController.handle)
router.put("/travel/update", updateTravelController.handle)


export default router