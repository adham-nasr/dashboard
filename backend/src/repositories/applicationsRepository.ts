import { Application, type applicationType } from "../models/application.js"



export const fetchAllApplications = async (userId:string)=>{
    return await Application.find({user_id:userId})
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

export const removeApplication = async (userId:string,applicationId:string)=>{
    return await Application.deleteOne({user_id:userId,_id:applicationId})
}