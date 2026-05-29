// import { Db,  MongoClient } from "mongodb";
import mongoose from "mongoose";
import { config } from "./config.js";



const url = config.dbUrl;

export const connectDb =  async () => {
    try {
        await mongoose.connect(url,{dbName:config.dbName});
    }catch(e){
        
        process.exit(-1)
    }
}
