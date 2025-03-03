import { getEnv } from "../utils/get.env";

const appConfig = ()=>(
    {
        NODE_ENV: getEnv("NODE_ENV","development"),
        PORT: getEnv("PORT","4004"),
        BASE_PATH: getEnv("BASE_PATH","/api"),

        JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET",""),
        JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN","1d"),

        DATABASE_URL: getEnv("DATABASE_URL",""),
        FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN","localhost")
    }
)

export const config = appConfig();