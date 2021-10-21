import { Router } from "express";
import CreateCountryController from "../../controllers/location/createCountry.controller";
import CreateProvinceController from "../../controllers/location/createProvince.controller";
import CreateSpotController from "../../controllers/location/createSpot.controller";
import UpdateCountryController from "../../controllers/location/updateCountry.controller";
import UpdateProvinceController from "../../controllers/location/updateProvince.controller";
import UpdateSpotController from "../../controllers/location/updateSpot.controller";
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