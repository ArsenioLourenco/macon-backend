import { Router } from 'express';
import { Auth } from './middlewares/tokenGuard';
import normalUsers from "./routes/normalUsers.routes";
import { isUsersAuthenticated } from './middlewares/isAuthenticated';
import logoutRoute from "./routes/logout.routes";
import userRoutes from "./routes/users.routes";
import transportRoutes from "./routes/transport.routes";
// Router Instance
const router = Router();

// base Route
router.get('/', (__, res) => {
    res.send({
        app: 'macon-backend',
        versao: 'v0.1.0',
        autor: "©2020 Interdigitos LDA",
        erro: '0x000001',
        msg_erro: 'Nenhum parametro foi aplicado.',
        note: "Trainess Codando..."
    });
});
// isUserAuthenticated
router.get('/users/isAuthenticated', isUsersAuthenticated)
// all users routes
router.use(normalUsers);
// auth route
// router.use(Auth);
router.use(transportRoutes)
// Routes with Restriction
router.use(userRoutes);
// logout route
router.use(logoutRoute)

export default router;