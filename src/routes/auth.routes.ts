import { Router } from "express";
import {
  activeUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../controllers/auth.controller";
import { authorization } from "../middlewares/authorization.middleware";
import { authenticate } from "../middlewares/authenticate.middleware";

const authRoutes = Router();

authRoutes.post(
  "/register",
  authenticate,
  authorization(["admin"]),
  registerUserController,
);
authRoutes.patch("/activation", activeUserController);
authRoutes.post("/login", loginUserController);
authRoutes.get("/logout", logoutUserController);

export default authRoutes;
