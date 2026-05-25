import app from "./app.js";
import { connectDb } from "./db.js";

await connectDb()
app.listen(3003,()=>{
    console.log("server running on port 3003");
})