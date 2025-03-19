import { Router } from "express";
import { authorization } from "../middlewares/authorization.middleware";
import { authenticate } from "../middlewares/authenticate.middleware";
import {
  deleteClientController,
  getAllClientController,
  getClientController,
  registerClientController,
} from "../controllers/client.controller";

const clientRoutes = Router();

clientRoutes.post("/new", registerClientController);
clientRoutes.get("/:id", getClientController);
clientRoutes.get("/clients/all", getAllClientController);
clientRoutes.patch("/update/:id", getAllClientController);
clientRoutes.patch(
  "/delete/:id",
  authorization(["admin"]),
  deleteClientController,
);

export default clientRoutes;
