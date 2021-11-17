import { Router } from "express";
import CreateCountryController from "../controllers/location/country/createCountry.controller";
import DeleteCountryController from "../controllers/location/country/deleteCountry.controller";
import GetCountriesController from "../controllers/location/country/getAllCountries.controller";
import GetCountryByIDController from "../controllers/location/country/getCountryByID.controller";
import UpdateCountryController from "../controllers/location/country/updateCountry.controller";
import CreateProvinceController from "../controllers/location/province/createProvince.controller";
import DeleteProvinceController from "../controllers/location/province/deleteProvince.controller";
import GetProvincesController from "../controllers/location/province/getAllProvinces.controller";
import GetProvinceByIDController from "../controllers/location/province/getProvinceByID.controller";
import UpdateProvinceController from "../controllers/location/province/updateProvince.controller";
import CreateSpotController from "../controllers/location/spot/createSpot.controller";
import DeleteSpotController from "../controllers/location/spot/deleteSpot.controller";
import GetSpotsController from "../controllers/location/spot/getAllSpots.controller";
import GetSpotByIDController from "../controllers/location/spot/getSpotByID.controller";
import GetSpotsProvinceController from "../controllers/location/spot/getSpotsProvince.controller";
import UpdateSpotController from "../controllers/location/spot/updateSpot.controller";
import { createCountryMiddleware } from "../middlewares/location/CreateCountryMiddleware";
import { createProvinceMiddleware } from "../middlewares/location/CreateProvinceMiddleware";

const router = Router();

//Country Controllers
const createCountryController = new CreateCountryController();
const updateCountryController = new UpdateCountryController();
const deleteCountryControler = new DeleteCountryController();
const getCountryByIDController = new GetCountryByIDController();
const getAllCountriesController = new GetCountriesController();

//Province Controllers
const createProvinceController = new CreateProvinceController();
const updateProvinceController = new UpdateProvinceController();
const deleteProvinceControler = new DeleteProvinceController();
const getProvinceByIDController = new GetProvinceByIDController();
const getAllProvincesController = new GetProvincesController();

//Spot Controllers
const createSpotController = new CreateSpotController();
const updateSpotController = new UpdateSpotController();
const deleteSpotControler = new DeleteSpotController();
const getSpotByIDController = new GetSpotByIDController();
const getAllSpotsController = new GetSpotsController();
const getSpotsProvinceController = new GetSpotsProvinceController();

//Country Routes Information
router.post('/country/create', createCountryMiddleware, createCountryController.handle)
router.put('/country/update', updateCountryController.handle)
router.delete('/country/delete/:id', deleteCountryControler.handle)
router.get('/country/:id', getCountryByIDController.handle)
router.get('/countries/list', getAllCountriesController.handle)

//Province Routes Information
router.post('/province/create', createProvinceMiddleware, createProvinceController.handle)
router.put('/province/update', updateProvinceController.handle)
router.delete('/province/delete/:id', deleteProvinceControler.handle)
router.get('/province/:id', getProvinceByIDController.handle)
router.get('/provinces/list/:id', getAllProvincesController.handle)

//Spot Routes Information
router.post('/spot/create', createSpotController.handle)
router.put('/spot/update', updateSpotController.handle)
router.delete('/spot/delete/:id', deleteSpotControler.handle)
router.get('/spot/:id', getSpotByIDController.handle)
router.get('/spots/list', getAllSpotsController.handle)
router.get('/spotprovince', getSpotsProvinceController.handle)

export default router;