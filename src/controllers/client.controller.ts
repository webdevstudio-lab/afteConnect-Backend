import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.midleware";
import { HTTPSTATUS } from "../config/http.config";
import { clientSchema } from "../validation/client.validation";
import {
  deleteClientService,
  getAllClientService,
  getClientService,
  registerClientService,
  updateClientService,
} from "../services/client.service";

export const registerClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = clientSchema.parse({ ...req.body });

    const { client } = await registerClientService(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Le client a bien été créé avec success",
      client,
    });
  },
);

export const getAllClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const clients = await getAllClientService();

    return res.status(HTTPSTATUS.OK).json({
      message: "Liste des clients",
      clients,
    });
  },
);

export const getClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const client = await getClientService(id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Information sur le client",
      client,
    });
  },
);

export const updateClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = clientSchema.parse({ ...req.body });
    const id = req.params.id;

    const client = await updateClientService(body, id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Le client a bien été mis à jour",
      client,
    });
  },
);

export const deleteClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    await deleteClientService(id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Le client a bien été supprimé",
    });
  },
);
