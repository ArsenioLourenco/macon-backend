import { Router } from 'express';
import locationRoute from './routes/location/CreateLocation.route'
// Router Instance
const router = Router();

// // base Route
// router.get('/', (__, res) => {
//     res.send({
//         app: 'folhaDeRostoApp',
//         versao: 'v0.2.1',
//         autor: "©2020 Interdigitos LDA",
//         erro: '0x000001',
//         msg_erro: 'Nenhum parametro foi aplicado.',
//         note: "Trainess Refatorando...",
//         teste: isUsersAuthenticated
//     });
// });

// router.use('/location/country', CreateCountryMiddleware)

router.get('/test', (req, res) =>{
    res.send('test')
    })

router.use(locationRoute);

export default router;