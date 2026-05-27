import mongoose from "mongoose"
import { Application, type applicationType } from "../models/application.js"



export const fetchApplicationAndCountLogs = async (userId:string)=>{
    return await Application.find({user_id:userId})
}

export const  fetchAllApplications= async (userId:string)=>{
    return await Application.aggregate([
        {
            $match:{
                user_id: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:'log',
                as:'logs',
                localField:"_id",
                foreignField:"application_id"
            }
        },
        {
            $addFields:{
                logCount: {
                    $size:"$logs"
                }
            }
        },
        {
            $project:{
                logs:0
            }
        }
    ])
}
export const fetchApplicationByName = async (userId:string,name:string)=>{
    return await Application.findOne({user_id:userId,name:name})
}

export const fetchApplicationById = async (userId:string,applicationId:string)=>{
    return await Application.findOne({user_id:userId,_id:applicationId})
}



export const createApplication = async (applicationData:applicationType) => {
    return await Application.create(applicationData);
}

export const removeApplicationById = async (userId:string,applicationId:string)=>{
    return await Application.deleteOne({user_id:userId,_id:applicationId})
}

export const removeApplicationByName = async (userId:string,name:string)=>{
    return await Application.deleteOne({user_id:userId,name:name})
}