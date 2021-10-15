import Router from "express";
import CreateTransportController from "../controllers/transport/createTransport.controller";
import CreateTypeTransportController from "../controllers/transport/createTypeTransport.controller";
import DeleteTransportController from "../controllers/transport/deleteTransport.controller";
import DeleteTypeTransportController from "../controllers/transport/deleteTypeTransport.controller";
import FindAllTransportController from "../controllers/transport/findAllTransport.controller";



const router = Router();



const readyAllTransport = new FindAllTransportController()
const cretateTransportRoute = new CreateTransportController()
const deleteTransportRoute =  new DeleteTransportController()
const createTypeTransportRoute = new CreateTypeTransportController()
const deleteTypeTransportRoute = new DeleteTypeTransportController()

router.get("/readyAllTransport", readyAllTransport.handle)
router.post("/createTransport", cretateTransportRoute.handle)
router.delete("/deleteTransport/:id", deleteTransportRoute.handle)
router.post("/CreateTypeTransport", createTypeTransportRoute.handle)
router.delete("/delete/typeTransport/:id", deleteTypeTransportRoute.handle)


export default router;