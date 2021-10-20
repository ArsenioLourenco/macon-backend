import { Router, Request, Response } from 'express';
import logoutRoute from "./routes/logout.routes";
import userRoutes from "./routes/users.routes";
import transportRoutes from "./routes/transport.routes";
//import SendSMS from './services/sendSMS/sendSMS.service';
// Router Instance
const router = Router();
// const sendSMS = new SendSMS();
// base Route
// router.get('/', (__, res) => {
//     res.send({
//         app: 'macon-backend',
//         versao: 'v0.1.0',
//         autor: "©2021 Interdigitos LDA",
//         erro: '0x000001',
//         msg_erro: 'Nenhum parametro foi aplicado.',
//         note: "Trainess Codando..."
//     });
// });
// router.get('/sendSMS', async (request: Request, response: Response) => {
//     try{
//         const sending = await sendSMS.execute({
//             contact: 244945323281, 
//             text: "testando"
//         });
//         return response.status(200)
//             .json({
//                 sucess: true,
//                 message: 'Sender',
//                 data: sending
//             });
//     }catch(err){
//         return response.json({
//             message: err.message
//         });
//     }
// })
// isUserAuthenticated
// router.get('/users/isAuthenticated', isUsersAuthenticated)
// all users routes
// router.use(Auth);
// Routes with Restriction
router.use(userRoutes);
router.use(transportRoutes)
// logout route
router.use(logoutRoute)

export default router;