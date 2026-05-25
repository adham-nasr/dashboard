import mongoose, { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";
import { regexes } from "../utils/helpers.js";

const userSchema = new Schema({
    username: {
        type: String,
        maxLength:30,
        minLength:3,
        required:true
    },
    email: {
        type:String,
        required: true,
        unique:true,
        validate:{
            validator: (email:string) => regexes.email.test(email),
            message: "Invalid credentials"
        }

    },
    password: {
        type: String,
        minLength:3,
        required:true
    }
})

export type UserType = InferSchemaType<typeof userSchema>

export const User = mongoose.model('user',userSchema,'user')