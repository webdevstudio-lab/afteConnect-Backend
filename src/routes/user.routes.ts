import Router from "express";
import {
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  getUserController,
  updateUserController,
  resteUserController,
} from "../controllers/user.controller";
import { authorization } from "../middlewares/authorization.middleware";

const userRoutes = Router();

userRoutes.get("/", getUserController);
userRoutes.get("/:id", getUserByIdController);
userRoutes.get("/users/all", authorization(["admin"]), getAllUsersController);
userRoutes.patch("/update/:id", authorization(["admin"]), updateUserController);
userRoutes.patch("/reset/:id", authorization(["admin"]), resteUserController);
userRoutes.delete(
  "/delete/:id",
  authorization(["admin"]),
  deleteUserController,
);

export default userRoutes;
