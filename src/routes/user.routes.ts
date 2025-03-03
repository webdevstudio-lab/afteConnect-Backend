import Router from "express";
import { deleteUserController, getAllUsersController, getUserController, updateUserController } from "../controllers/user.controller";
import { authorization } from "../middlewares/authorization.middleware";

const userRoutes = Router();

userRoutes.get('/:id', getUserController);
userRoutes.get('/',authorization(["admin"]), getAllUsersController);
userRoutes.patch('/update/:id',authorization(["admin"]), updateUserController);
userRoutes.delete('/delete/:id',authorization(["admin"]), deleteUserController);

export default userRoutes