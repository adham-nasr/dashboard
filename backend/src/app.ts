import express from "express";
import authRoute from "./routes/authRoute.js";
import type { Request , Response , NextFunction  } from "express";
import applicationsRoute from "./routes/applicationsRoute.js";
import logsRoute from "./routes/logsRoute.js";

const app = express();

app.use(express.json())

// app.use('/api/attempts',attemptRoute)
// app.use('/api/data',problemsRoute)
// app.use('/auth',authRoute)

app.use('/api/users',authRoute)
app.use('/api/applications/:name/logs',logsRoute)
app.use('/api/applications',applicationsRoute)
app.use('/ping', (req:Request , res:Response , next:NextFunction) =>{res.status(200).json({message:"pong"})})
// accumalted errors

app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
    console.log(error)
    res.status(500).json({message:"Internal Server Error"})
})
export default app