// import { Db,  MongoClient } from "mongodb";
import mongoose from "mongoose";
const url = "mongodb://localhost:27017";

export const connectDb =  async () => {
    try {
        await mongoose.connect(url,{dbName:"dashboard"});
    }catch(e){
        console.log(e)
        process.exit(-1)
    }
}
