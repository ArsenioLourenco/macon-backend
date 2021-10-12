import { Router } from 'express';
import { Auth } from './middlewares/tokenGuard';
import normalUsers from "./routes/normalUsers.routes";
import { isUsersAuthenticated } from './middlewares/isAuthenticated';
import logoutRoute from "./routes/logout.routes";
import userRoutes from "./routes/users.routes";

// Router Instance
const router = Router();

// base Route
router.get('/', (__, res) => {
    res.send({
        app: 'folhaDeRostoApp',
        versao: 'v0.2.1',
        autor: "©2020 Interdigitos LDA",
        erro: '0x000001',
        msg_erro: 'Nenhum parametro foi aplicado.',
        note: "Trainess Refatorando...",
        teste: isUsersAuthenticated
    });
});
// isUserAuthenticated
router.get('/users/isAuthenticated', isUsersAuthenticated)
// all users routes
router.use(normalUsers);
// auth route
router.use(Auth);
// Routes with Restriction
router.use(userRoutes);
// logout route
router.use(logoutRoute)

export default router;