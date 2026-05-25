import type { NextFunction,Response } from "express";
import type { AuthenticationRequest } from "../types.js";
import { fetchApplicationById, fetchApplicationByName } from "../repositories/applicationsRepository.js";
import type { logType } from "../models/log.js";
import { createLog, fetchAllLogs } from "../repositories/logsRepository.js";



export const getAllLogs = async (request:AuthenticationRequest , response:Response , next:NextFunction)=>{
    const userId = request.userId!;

    const  name = request.params.name
    // console.log(request)
    console.log(request.params)
    console.log(name)
    if(!name || Array.isArray(name))
        return response.status(400).json({message:"Invalid request"})

    const application = await fetchApplicationByName(userId,name)
    if(!application)
        return response.status(400).json({message:"Invalid application data"})
    const logs = await fetchAllLogs(application._id.toString())
    return response.status(200).json(logs)
}

export const postLog = async (request:AuthenticationRequest , response:Response , next:NextFunction)=>{
    const userId = request.userId!;
    const name = request.params.name
    let logData:logType = request.body
    const { message , level} = logData
    if(!message || !level || !name || Array.isArray(name))
        return response.status(401).json({message:"Invalid application data"})

    const application = await fetchApplicationByName(userId,name)
    if(!application)
        response.status(403).send()

    logData = {...logData , application_id:application!._id}

    const logs = await createLog(logData)
    return response.status(201).json(logs)
}