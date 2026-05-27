import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { asyncHandler } from "../utils/helpers.js";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";

const authRoute = Router();

authRoute.post('/login',asyncHandler(login));
authRoute.post('/register',asyncHandler(register))
authRoute.post('/logout',authenticationMiddleware,asyncHandler(logout))


export default authRoute