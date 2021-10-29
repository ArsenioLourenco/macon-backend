import Router from "express"
import CreateTravelsController from "../controllers/travels/createTravel.controller"
import DeleteAllTravelController from "../controllers/travels/deleteAllTravel.controller"
import DeleteTravelController from "../controllers/travels/deleteTravel.controller"
import GetAllTravels from "../controllers/travels/getAllTravels.controller"
import UpdateTravelsController from "../controllers/travels/updateTravels.controller"
 

const router= Router()

const createTravelsRoute= new CreateTravelsController()
const deleteTravelRoute= new DeleteTravelController()
const getAllTravelRoute= new GetAllTravels()
const deleteAllTravelRoute= new DeleteAllTravelController()
const updateTravelsRoute= new UpdateTravelsController()


router.post("/Create/Travel", createTravelsRoute.handle)
router.delete("/Delete/Travel/:id", deleteTravelRoute.handle)
router.delete("/delete/All/Travel", deleteAllTravelRoute.handle)
router.get("/get/travel", getAllTravelRoute.handle)
router.put("/update/Travel", updateTravelsRoute.handle)


export default router