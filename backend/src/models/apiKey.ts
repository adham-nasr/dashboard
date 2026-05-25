import mongoose, { type InferSchemaType } from "mongoose";


const apiKeySchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    apiKey:{
        type:String,
        required:true,
        unique:true
    }
})

export type apiKeyType = InferSchemaType<typeof apiKeySchema>

export const ApiKey = mongoose.model('apiKey',apiKeySchema,'apiKey')