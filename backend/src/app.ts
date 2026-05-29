import express from "express";
import authRoute from "./routes/authRoute.js";
import type { Request , Response , NextFunction  } from "express";
import applicationsRoute from "./routes/applicationsRoute.js";
import logsRoute from "./routes/logsRoute.js";
import cors from "cors"
const app = express();

app.use(express.json())

const allowedOrigins = ['http://localhost:5173' , 'https://tubular-zabaione-6d8c05.netlify.app'];
app.use(cors({
    origin: allowedOrigins,
}))

app.use(express.urlencoded({ extended: true }));

app.use('/api/users',authRoute)
app.use('/api/applications/:name/logs',logsRoute)
app.use('/api/applications',applicationsRoute)
app.use('/ping', (req:Request , res:Response , next:NextFunction) =>{res.status(200).json({message:"pong"})})

// accumalted errors
app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
    
    res.status(500).json({message:"Internal Server Error"})
})
export default app