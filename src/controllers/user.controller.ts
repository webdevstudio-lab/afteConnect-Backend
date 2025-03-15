import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.midleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  getAllUsersService,
  getUserService,
  updateUserService,
  deleteUserService,
  resetUserPasswordService,
} from "../services/user.service";
import { updateUserSchema } from "../validation/user.validation";

export const getUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.userId as string;

    const user = await getUserService(id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Information sur l'utilisateur",
      user,
    });
  },
);

export const getUserByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const user = await getUserService(id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Information sur l'utilisateur",
      user,
    });
  },
);

export const getAllUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await getAllUsersService();

    return res.status(HTTPSTATUS.OK).json({
      message: "Liste des utilidateurs",
      users,
    });
  },
);

export const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = updateUserSchema.parse({ ...req.body });

    const users = await updateUserService(body, id);

    return res.status(HTTPSTATUS.OK).json({
      message:
        "Les informations sur l'utlisateur ont été mis à jour avec succès",
      users,
    });
  },
);

export const resteUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const user = await resetUserPasswordService(id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Le compte de l'utlistateur a bien été réinitialisé",
    });
  },
);

export const deleteUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const user = await deleteUserService(id);

    return res.status(HTTPSTATUS.OK).json({
      message: `L'utilisateur a bien été supprimé`,
      user,
    });
  },
);
