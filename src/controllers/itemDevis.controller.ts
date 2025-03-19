import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.midleware";
import { HTTPSTATUS } from "../config/http.config";
import { itemDevisSchema } from "../validation/devis.validation";
import {
  addItemToDevisService,
  deleteItemDevisService,
  getAllItemDevisService,
} from "../services/itemDevis.service";

export const addItemController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = itemDevisSchema.parse({ ...req.body });
    const id = req.params.id;

    const devisItem = await addItemToDevisService(id, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "L'article a bien été ajouté au devis",
      devisItem,
    });
  },
);

export const getAllItemDevisController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const devisItem = await getAllItemDevisService(id);

    return res.status(HTTPSTATUS.OK).json({
      devisItem,
    });
  },
);

export const updateItemDevisController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = itemDevisSchema.parse({ ...req.body });
    const id = req.params.id;

    const devisItem = await addItemToDevisService(id, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "L'article a bien été mis à jour",
      devisItem,
    });
  },
);

export const deleteItemDevisController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    await deleteItemDevisService(id);

    return res.status(HTTPSTATUS.OK).json({
      message: "L'article a bien été supprimé",
    });
  },
);
