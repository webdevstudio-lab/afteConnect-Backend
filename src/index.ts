import "dotenv/config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/app.config";
import { errorHandler } from "./middlewares/errorHandler.middelwares";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.midleware";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { authenticate } from "./middlewares/authenticate.middleware";
import { accessRoute } from "./middlewares/authorization.middleware";
import clientRoutes from "./routes/client.routes";
import devisRoutes from "./routes/devis.routes";
import itemDevisRoutes from "./routes/itemDevis.routes";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res
      .status(HTTPSTATUS.OK)
      .json({ message: "Bienvenue sur le serveur de Afteconnet v1.0" });
  }),
);

//API ROUTES
app.use(`${BASE_PATH}/auth`, authRoutes);

//#PROTECTED ROUTES
app.use(`${BASE_PATH}/user`, authenticate, userRoutes);
app.use(`${BASE_PATH}/clients`, authenticate, clientRoutes);
app.use(`${BASE_PATH}/devis`, authenticate, devisRoutes);
app.use(`${BASE_PATH}/items_devis`, authenticate, itemDevisRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(
    `Server is running on port ${config.PORT} in ${config.NODE_ENV} mode on http://localhost:${config.PORT}`,
  );
});
