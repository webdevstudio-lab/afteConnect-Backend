import 'dotenv/config';
import express, { Request, Response} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {config} from "./config/app.config";
import { errorHandler } from './middlewares/errorHandler.middelwares';
import { HTTPSTATUS } from './config/http.config';
import { asyncHandler } from './middlewares/asyncHandler.midleware';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import {authenticate} from './middlewares/authenticate.middleware';
import { accessRoute } from './middlewares/authorization.middleware';

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());


app.use(cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true
}))

app.get('/',
    asyncHandler(async (req: Request, res: Response) => { 
        res.status(HTTPSTATUS.OK).json({message: "Bienvenue sur le serveur de Afteconnet v1.0"}) 
    })
 )

 //API ROUTES
app.use(`${BASE_PATH}/auth`, authRoutes);

//#PROTECTED ROUTES
app.use(`${BASE_PATH}/user`, authenticate, accessRoute(["admin"]), userRoutes);



app.use(errorHandler)

app.listen(config.PORT, async () => {
    console.log(`Server is running on port ${config.PORT} in ${config.NODE_ENV} mode on http://localhost:${config.PORT}`);
})