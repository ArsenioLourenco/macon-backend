import { Router } from "express";
import CreateCountryController from "../../controllers/location/createCountry.controller";
import CreateProvinceController from "../../controllers/location/createProvince.controller";
import CreateSpotController from "../../controllers/location/createSpot.controller";
import DeleteCountryController from "../../controllers/location/deleteCountry.controller";
import DeleteProvinceController from "../../controllers/location/deleteProvince.controller";
import DeleteSpotController from "../../controllers/location/deleteSpot.controller";
import GetCountriesController from "../../controllers/location/getAllCountries.controller";
import GetProvincesController from "../../controllers/location/getAllProvinces.controller";
import GetSpotsController from "../../controllers/location/getAllSpots.controller";
import GetCountryByIDController from "../../controllers/location/getCountryByID.controller";
import GetProvinceByIDController from "../../controllers/location/getProvinceByID.controller";
import GetSpotByIDController from "../../controllers/location/getSpotByID.controller";
import GetSpotsProvinceController from "../../controllers/location/getSpotsProvince.controller";
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

const deleteCountryControler = new DeleteCountryController();
const deleteProvinceControler = new DeleteProvinceController();
const deleteSpotControler = new DeleteSpotController();

const getCountryByIDController = new GetCountryByIDController();
const getAllCountriesController = new GetCountriesController();

const getProvinceByIDController = new GetProvinceByIDController();
const getAllProvincesController = new GetProvincesController();

const getSpotByIDController = new GetSpotByIDController();
const getAllSpotsController = new GetSpotsController();
const getSpotsProvinceController = new GetSpotsProvinceController();

router.post('/location/create/country', createCountryController.handle)
router.post('/location/create/province', createProvinceController.handle)
router.post('/location/create/spot', createSpotController.handle)

router.put('/location/update/country', updateCountryController.handle)
router.put('/location/update/province', updateProvinceController.handle)
router.put('/location/update/spot', updateSpotController.handle)

router.delete('/location/delete/country/:id', deleteCountryControler.handle)
router.delete('/location/delete/province/:id', deleteProvinceControler.handle)
router.delete('/location/delete/spot/:id', deleteSpotControler.handle)

router.get('/location/read/country/:id', getCountryByIDController.handle)
router.get('/location/read/countries', getAllCountriesController.handle)

router.get('/location/read/province/:id', getProvinceByIDController.handle)
router.get('/location/read/provinces', getAllProvincesController.handle)

router.get('/location/read/spot/:id', getSpotByIDController.handle)
router.get('/location/read/spots', getAllSpotsController.handle)
router.get('/location/read/spotprovince', getSpotsProvinceController.handle)

export default router;