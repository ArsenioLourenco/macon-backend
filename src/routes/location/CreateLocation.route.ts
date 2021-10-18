import { Router } from "express";
import CreateCountryController from "../../controllers/location/CreateCountry.controller";
import CreateProvinceController from "../../controllers/location/CreateProvince.controller";
import CreateSpotController from "../../controllers/location/CreateSpot.controller";

const router = Router();

const createCountryController = new CreateCountryController();
const createProvinceController = new CreateProvinceController();
const createSpotController = new CreateSpotController();

router.post('/location/country', createCountryController.handle)
router.post('/location/province', createProvinceController.handle)
router.post('/location/spot', createSpotController.handle)

export default router;