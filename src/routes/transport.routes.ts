import Router from "express";
import CreateTransportController from "../controllers/transport/createTransport.controller";
import CreateTypeTransportController from "../controllers/transport/createTypeTransport.controller";
import DeleteTransportController from "../controllers/transport/deleteTransport.controller";
import DeleteTypeTransportController from "../controllers/transport/deleteTypeTransport.controller";
import GetAllTransportsController from "../controllers/transport/getAllTransports.controller";
import GetAllTypeTransportsController from "../controllers/transport/getTypeTransport.controller";
import { createTransport } from "../middlewares/transport/createTransport.middlewere";
import { createTypeTransport } from "../middlewares/transport/createTypeTransport.middlewere";

const router = Router();

const getAllTransportsController    = new GetAllTransportsController();
const createTransportController     = new CreateTransportController();
const deleteTransportController     = new DeleteTransportController();
const createTransportTypeController = new CreateTypeTransportController();
const deleteTransportTypeController = new DeleteTypeTransportController();
const getAllTypeTransports          = new GetAllTypeTransportsController();

router.get("/transport/all", getAllTransportsController.handle);
router.post("/transport/create", createTransport, createTransportController.handle);
router.delete("/transport/delete/:id", deleteTransportController.handle);
router.post("/transportType/create",createTypeTransport, createTransportTypeController.handle);
router.delete("/transportType/delete/:id", deleteTransportTypeController.handle);
router.get("/typeTransport/all", getAllTypeTransports.handle)
                                       
export default router;