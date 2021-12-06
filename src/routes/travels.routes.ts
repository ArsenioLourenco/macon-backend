import Router from "express"
import CreatePaymentController from "../controllers/payment/createPayment.controller"
import DeletePaymentController from "../controllers/payment/deletePayment.controller"
import GetPaymentController from "../controllers/payment/getPayment.controller"
import CreateTravelsController from "../controllers/travels/createTravel.controller"
import DeleteAllTravelController from "../controllers/travels/deleteAllTravel.controller"
import DeleteTravelController from "../controllers/travels/deleteTravel.controller"
import GetAllTravelsController from "../controllers/travels/getAllTravels.controller"
import UpdateTravelsController from "../controllers/travels/updateTravels.controller"
import { byIDTravel } from "../middlewares/travel/byIdTravel.middlewere"
import { createTravels } from "../middlewares/travel/travels.middlewere"
 
const router= Router();

const createTravelsController = new CreateTravelsController();
const deleteTravelController = new DeleteTravelController();
const getAllTravelController = new GetAllTravelsController();
const deleteAllTravelController = new DeleteAllTravelController();
const updateTravelsController = new UpdateTravelsController();

const createPaymentControler= new CreatePaymentController(),
 getPaymentController= new GetPaymentController(),
deletePaymentController= new DeletePaymentController()


router.post("/travels/create", createTravels, createTravelsController.handle);
router.delete("/travels/delete/:id",byIDTravel, deleteTravelController.handle);
router.delete("/travels/delete/all", deleteAllTravelController.handle);
router.get("/travels/all", getAllTravelController.handle);
router.put("/travels/update",createTravels, updateTravelsController.handle);

router.post("/payment/create", createPaymentControler.handle)
router.get("/payment/:id", getPaymentController.handle)
router.delete("/payment/delete/:id", deletePaymentController.handle)

export default router