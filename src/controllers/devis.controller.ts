// import { Request, Response } from "express";
// import { asyncHandler } from "../middlewares/asyncHandler.midleware";
// import { HTTPSTATUS } from "../config/http.config";
// import {devisSchema} from "../validation/devis.validation";

// export const createDevisController = asyncHandler(
//     async (req: Request, res: Response) => {
//        const body = devisSchema.parse({...req.body});
   
//        const {devis} =  await createDevisService(body);
   
//        return res.status(HTTPSTATUS.CREATED).json({
//            message: "L'utilisateur a bien été créé avec success",
//            user
//        })
// });