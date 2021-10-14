import Router from "express";
import CreateTransportController from "../controllers/transport/createTransport.controller";
import DeleteTransportController from "../controllers/transport/deleteTransport.controller";
import FindAllTransportController from "../controllers/transport/findAllTransport.controller";

const router = Router();



const readyAllTransport = new FindAllTransportController()
const cretateTransportRoute = new CreateTransportController()
const deleteTransportRoute =  new DeleteTransportController()


router.get("/readyAllTransport", readyAllTransport.handle)
router.post("/createTransport", cretateTransportRoute.handle)
router.delete("/deleteTransport/:id", deleteTransportRoute.handle)


export default router;