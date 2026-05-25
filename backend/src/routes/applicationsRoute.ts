import { Router } from "express";
import { asyncHandler } from "../utils/helpers.js";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";
import { deleteApplication, getAllApplications, getApplicationByName, postApplication } from "../controllers/applicationsController.js";

const applicationsRoute = Router();

applicationsRoute.use(authenticationMiddleware);
applicationsRoute.get("/",asyncHandler(getAllApplications))
applicationsRoute.get("/:name",asyncHandler(getApplicationByName))
applicationsRoute.post("/",asyncHandler(postApplication))
applicationsRoute.delete('/:name',asyncHandler(deleteApplication))

export default applicationsRoute