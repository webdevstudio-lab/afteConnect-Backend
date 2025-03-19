import { Router } from "express";
import { authorization } from "../middlewares/authorization.middleware";
import {
  createDevisController,
  deleteDevisController,
  getAllDevisClientController,
  getAllDevisController,
  getOnDevisController,
  updateDevisController,
} from "../controllers/devis.controller";

const devisRoutes = Router();

devisRoutes.post("/new", createDevisController);
devisRoutes.get("/:id", getOnDevisController);
devisRoutes.get("/devis/all", getAllDevisController);
devisRoutes.get("/client/:id", getAllDevisClientController);
devisRoutes.patch("/update/:id", updateDevisController);
devisRoutes.delete(
  "/delete/:id",
  authorization(["admin"]),
  deleteDevisController,
);

export default devisRoutes;
