import type { NextFunction,Response } from "express";
import type { AuthenticationRequest } from "../types.js";
import { fetchApplicationById, fetchApplicationByName } from "../repositories/applicationsRepository.js";
import type { logType } from "../models/log.js";
import { countLogs, createLog, fetchAllLogs, fetchAllLogsByPage } from "../repositories/logsRepository.js";
import type { SortOrder } from "mongoose";



export const getAllLogs = async (request:AuthenticationRequest , response:Response , next:NextFunction)=>{
    const userId = request.userId!;

    const  name = request.params.name

    const sortingQuery = request.query?.sortingAlgo?.toString()
    const message = request.query?.message?.toString()
    const level = request.query?.level;
    const limit = request.query?.limit?.toString();
    const offset = request.query?.offset?.toString();
    let sortingAlgo:Record<string,1|-1> = {createdAt:-1}
    if(sortingQuery)
    {
        if(sortingQuery[0]==="-")
            sortingAlgo = {
                [sortingQuery.slice(1)]:-1
            }
        else
            sortingAlgo = {
                [sortingQuery]:1
            }

    }
    let filters:Record<string,string|any>={}
    if(message)
    {
        const safeMessag = RegExp.escape(message);
        filters["message"]={
            "$regex": new RegExp(safeMessag,'i')
        }
    }
    if(level)
        filters["level"] = level.toString()
    
    // 
    
    
    if(!name || Array.isArray(name))
        return response.status(400).json({message:"Invalid request"})

    const application = await fetchApplicationByName(userId,name)
    if(!application)
        return response.status(400).json({message:"Invalid application data"})
    const logs = limit && offset ?  await fetchAllLogsByPage(application._id.toString(),parseInt(limit),parseInt(offset),filters,sortingAlgo) 
                                :
                                    await fetchAllLogs(application._id.toString(),filters,sortingAlgo)
    let total = await countLogs(application._id.toString())
    total = total.length ? total[0] : total
    
    
    return response.status(200).json({logs:logs,stats:total})
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