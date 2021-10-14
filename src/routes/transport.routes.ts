import Router from "express";
import CreateTransportController from "../controllers/transport/createTransport.controller";
import FindAllTransportController from "../controllers/transport/findAllTransport.controller";

const router = Router();



const readyAllTransport = new FindAllTransportController()
const cretateTransportRoute = new CreateTransportController()


router.get("/readyAllTransport", readyAllTransport.handle)
router.post("/createTransport", cretateTransportRoute.handle)



export default router;