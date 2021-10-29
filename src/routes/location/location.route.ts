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

router.post('/location/create/country', createCountryMiddleware, createCountryController.handle)
router.post('/location/create/province', createProvinceMiddleware, createProvinceController.handle)
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