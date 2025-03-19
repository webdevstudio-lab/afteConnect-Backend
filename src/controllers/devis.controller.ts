import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.midleware";
import { HTTPSTATUS } from "../config/http.config";
import { devisSchema } from "../validation/devis.validation";
import {
  createDevisService,
  deleteDevisService,
  getAllDevisClientService,
  getAllDevisService,
  getDevisService,
  updateDevisService,
} from "../services/devis.service";

export const createDevisController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = devisSchema.parse({ ...req.body });

    const devis = await createDevisService(body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Devis créer avec success",
      devis,
    });
  },
);

export const getOnDevisController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const devis = await getDevisService(id);

    return res.status(HTTPSTATUS.OK).json({
      devis,
    });
  },
);

export const getAllDevisController = asyncHandler(
  async (req: Request, res: Response) => {
    const devis = await getAllDevisService();

    return res.status(HTTPSTATUS.OK).json({
      devis,
    });
  },
);

export const getAllDevisClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const devis = await getAllDevisClientService(id);

    return res.status(HTTPSTATUS.OK).json({
      devis,
    });
  },
);

export const updateDevisController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = devisSchema.parse({ ...req.body });
    const id = req.params.id;

    const devis = await updateDevisService(body, id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Le devis a bien été mis à jour",
      devis,
    });
  },
);

export const deleteDevisController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    await deleteDevisService(id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Le devis a bien été supprimé",
    });
  },
);
