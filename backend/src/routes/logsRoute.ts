import { Router } from "express";
import { getAllLogs, postLog } from "../controllers/logsController.js";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";



const logsRoute = Router({ mergeParams: true });

logsRoute.use(authenticationMiddleware)
logsRoute.get('/',getAllLogs)
logsRoute.post('/',postLog)

export default logsRoute