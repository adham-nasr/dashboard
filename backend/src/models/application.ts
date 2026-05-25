import mongoose from "mongoose";
import type { InferSchemaType } from "mongoose";
import type { type } from "os";

const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
},    
{
    timestamps:true

})

export type applicationType = InferSchemaType<typeof applicationSchema>

export const Application = mongoose.model('application',applicationSchema,'application')