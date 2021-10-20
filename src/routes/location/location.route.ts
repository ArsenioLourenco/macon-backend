import { Router } from "express";
import CreateCountryController from "../../controllers/location/CreateCountry.controller";
import CreateProvinceController from "../../controllers/location/CreateProvince.controller";
import CreateSpotController from "../../controllers/location/CreateSpot.controller";
import UpdateCountryController from "../../controllers/location/UpdateCountry.controller";
import UpdateProvinceController from "../../controllers/location/UpdateProvince.controller";
import UpdateSpotController from "../../controllers/location/UpdateSpot.controller";
import { CreateCountryMiddleware } from "../../middlewares/location/CreateCountryMiddleware";

const router = Router();

const createCountryController = new CreateCountryController();
const createProvinceController = new CreateProvinceController();
const createSpotController = new CreateSpotController();
const updateCountryController = new UpdateCountryController();
const updateProvinceController = new UpdateProvinceController();
const updateSpotController = new UpdateSpotController();

router.post('/location/create/country', CreateCountryMiddleware, createCountryController.handle)
router.post('/location/create/province', createProvinceController.handle)
router.post('/location/create/spot', createSpotController.handle)
router.put('/location/update/country', updateCountryController.handle)
router.put('/location/update/province', updateProvinceController.handle)
router.put('/location/update/spot', updateSpotController.handle)

export default router;