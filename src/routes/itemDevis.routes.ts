import { Router } from "express";
import {
  addItemController,
  deleteItemDevisController,
  getAllItemDevisController,
  updateItemDevisController,
} from "../controllers/itemDevis.controller";

const itemDevisRoutes = Router();
itemDevisRoutes.post("/:id", addItemController);
itemDevisRoutes.get("/all/:id", getAllItemDevisController);
itemDevisRoutes.patch("/:id", updateItemDevisController);
itemDevisRoutes.delete("/:id", deleteItemDevisController);

export default itemDevisRoutes;
