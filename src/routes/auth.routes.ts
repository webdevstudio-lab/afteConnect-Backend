import { Router } from "express";
import { 
    activeUserController, 
    loginUserController, 
    logoutUserController, 
    registerUserController } from "../controllers/auth.controller";
import { authorization } from "../middlewares/authorization.middleware";


const authRoutes = Router();

authRoutes.post('/register', authorization(["admin"]), registerUserController);
authRoutes.post('/active/:id', activeUserController);
authRoutes.post('/login', loginUserController);
authRoutes.get('/logout', logoutUserController);

export default authRoutes