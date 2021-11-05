import { Router } from "express";
import CreateCountryController from "../../controllers/location/country/createCountry.controller";
import DeleteCountryController from "../../controllers/location/country/deleteCountry.controller";
import GetCountriesController from "../../controllers/location/country/getAllCountries.controller";
import GetCountryByIDController from "../../controllers/location/country/getCountryByID.controller";
import UpdateCountryController from "../../controllers/location/country/updateCountry.controller";
import CreateProvinceController from "../../controllers/location/province/createProvince.controller";
import DeleteProvinceController from "../../controllers/location/province/deleteProvince.controller";
import GetProvincesController from "../../controllers/location/province/getAllProvinces.controller";
import GetProvinceByIDController from "../../controllers/location/province/getProvinceByID.controller";
import UpdateProvinceController from "../../controllers/location/province/updateProvince.controller";
import CreateSpotController from "../../controllers/location/spot/createSpot.controller";
import DeleteSpotController from "../../controllers/location/spot/deleteSpot.controller";
import GetSpotsController from "../../controllers/location/spot/getAllSpots.controller";
import GetSpotByIDController from "../../controllers/location/spot/getSpotByID.controller";
import GetSpotsProvinceController from "../../controllers/location/spot/getSpotsProvince.controller";
import UpdateSpotController from "../../controllers/location/spot/updateSpot.controller";
import { createCountryMiddleware } from "../../middlewares/location/CreateCountryMiddleware";
import { createProvinceMiddleware } from "../../middlewares/location/CreateProvinceMiddleware";

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

router.get('/location/country/all', getAllCountriesController.handle)
router.get('/location/read/country/:id', getCountryByIDController.handle)
router.post('/location/country/create', createCountryMiddleware, createCountryController.handle);
router.put('/location/country/update', updateCountryController.handle);
router.delete('/location/delete/country/:id', deleteCountryControler.handle);

router.get('/location/read/province/:id', getProvinceByIDController.handle);
router.get('/location/provinces/all', getAllProvincesController.handle);
router.post('/location/province/create', createProvinceMiddleware, createProvinceController.handle);
router.put('/location/province/update', updateProvinceController.handle);
router.delete('/location/province/delete/:id', deleteProvinceControler.handle)

router.get('/location/read/spot/:id', getSpotByIDController.handle);
router.get('/location/spots/all', getAllSpotsController.handle);
router.get('/location/read/spotProvince', getSpotsProvinceController.handle);
router.post('/location/spot/create', createSpotController.handle);
router.put('/location/spot/update', updateSpotController.handle);
router.delete('/location/spot/delete/:id', deleteSpotControler.handle);

export default router;