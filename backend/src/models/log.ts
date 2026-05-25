import mongoose, { type InferSchemaType } from "mongoose";

const logSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true,
    },
    level:{
        type:String,
        enum:['info','warn','error'],
        required:true
    },

    application_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'application',
        required:true
    },
    count: Number
},    
{
    timestamps:true

})

export type logType = InferSchemaType<typeof logSchema>

export const Log = mongoose.model('log',logSchema,'log')