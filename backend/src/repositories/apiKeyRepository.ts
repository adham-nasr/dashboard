import mongoose from "mongoose"
import { ApiKey } from "../models/apiKey.js"


export const fetchUserByApiKey = async (apiKey:string)=>{
    return await ApiKey.findOne({apiKey:apiKey}).select('user_id')
}

export const removeUserKeys = async (userId:string)=>{
    return await ApiKey.deleteMany({user_id:userId})
}

export const createApiKey = async (userId:string,apiKey:string)=>{
    return await ApiKey.create({user_id:userId,apiKey:apiKey})
}