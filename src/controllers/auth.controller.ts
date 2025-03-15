import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.midleware";
import {
  loginSchema,
  registerSchema,
  activeUserSchema,
} from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import {
  registerUserService,
  loginUserService,
  activeUserService,
} from "../services/auth.service";
import { setAuthCookies } from "../utils/cookies";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({ ...req.body });

    const { user } = await registerUserService(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "L'utilisateur a bien été créé avec success",
      user,
    });
  },
);

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userAgent = req.headers["user-agent"];
    const body = loginSchema.parse({ ...req.body, userAgent });

    const { user, token } = await loginUserService(body);
    //set auth cookies
    setAuthCookies({ res, token });

    return res.status(HTTPSTATUS.OK).json({
      message: "Connexion reussie",
      user,
      token,
    });
  },
);

export const activeUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = activeUserSchema.parse({ ...req.body });

    const { user } = await activeUserService(body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Votre compte a bien été activé",
      user,
    });
  },
);

export const logoutUserController = asyncHandler(
  async (req: Request, res: Response) => {
    res.clearCookie("_Afteconnet_Token");
    return res
      .status(HTTPSTATUS.OK)
      .json({ message: "Vous avez bien été déconnecté" });
  },
);
