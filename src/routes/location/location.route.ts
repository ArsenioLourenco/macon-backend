import { Router } from "express";
import CreateCountryController from "../../controllers/location/createCountry.controller";
import CreateProvinceController from "../../controllers/location/createProvince.controller";
import CreateSpotController from "../../controllers/location/createSpot.controller";
import DeleteCountryController from "../../controllers/location/deleteCountry.controller";
import DeleteProvinceController from "../../controllers/location/deleteProvince.controller";
import DeleteSpotController from "../../controllers/location/deleteSpot.controller";
import ReadCountriesController from "../../controllers/location/readCountries.controller";
import ReadCountryByIDController from "../../controllers/location/readCountryByID.controller";
import ReadProvinceByIDController from "../../controllers/location/readProvinceByID.controller";
import ReadProvincesController from "../../controllers/location/readProvinces.controller";
import UpdateCountryController from "../../controllers/location/updateCountry.controller";
import UpdateProvinceController from "../../controllers/location/updateProvince.controller";
import UpdateSpotController from "../../controllers/location/updateSpot.controller";
import { CreateCountryMiddleware } from "../../middlewares/location/CreateCountryMiddleware";
import ReadSpotsController from '../../controllers/location/readSpots.controller';
import ReadSpotByIDController from "../../controllers/location/readSpotByID.controller";
import ReadSpotsProvinceController from '../../controllers/location/readSpotsProvince.controller';

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

const readCountryByIDController = new ReadCountryByIDController();
const readCountriesController = new ReadCountriesController();

const readProvinceByIDController = new ReadProvinceByIDController();
const readProvincesController = new ReadProvincesController();

const readSpotByIDController = new ReadSpotByIDController();
const readSpotsController = new ReadSpotsController();
const readSpotsProvinceController = new ReadSpotsProvinceController();

router.post('/location/create/country', CreateCountryMiddleware, createCountryController.handle)
router.post('/location/create/province', createProvinceController.handle)
router.post('/location/create/spot', createSpotController.handle)

router.put('/location/update/country', updateCountryController.handle)
router.put('/location/update/province', updateProvinceController.handle)
router.put('/location/update/spot', updateSpotController.handle)

router.delete('/location/delete/country/:id', deleteCountryControler.handle)
router.delete('/location/delete/province/:id', deleteProvinceControler.handle)
router.delete('/location/delete/spot/:id', deleteSpotControler.handle)

router.get('/location/read/country/:id', readCountryByIDController.handle)
router.get('/location/read/countries', readCountriesController.handle)

router.get('/location/read/province/:id', readProvinceByIDController.handle)
router.get('/location/read/provinces', readProvincesController.handle)

router.get('/location/read/spot/:id', readSpotByIDController.handle)
router.get('/location/read/spots', readSpotsController.handle)
router.get('/location/read/spotprovince', readSpotsProvinceController.handle)

export default router;