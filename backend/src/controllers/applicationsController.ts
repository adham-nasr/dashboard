import {  type Request, type Response, type NextFunction, application } from 'express';
import { createApplication, fetchAllApplications, fetchApplicationByName, removeApplication } from '../repositories/applicationsRepository.js';
import type { AuthenticationRequest } from '../types.js';
import type { applicationType } from '../models/application.js';
import mongoose from 'mongoose';

export const getAllApplications = async (request:AuthenticationRequest , response:Response , next:NextFunction)=>{
    const userId = request.userId!;

    const data = await fetchAllApplications(userId)
    response.status(200).json(data)
}

export const postApplication = async (request:AuthenticationRequest , response:Response , next:NextFunction)=>{
    const userId = request.userId!
    const applicationData:applicationType = request.body
    if(!applicationData || !applicationData.name)
        return response.status(400).json({message:"Invalid data"})
    console.log("USER Id = ")
    console.log(userId)
    console.log(new mongoose.Types.ObjectId(userId))
    console.log("Body")
    console.log(request.body)
    console.log("Application Data")
    console.log(applicationData)
    applicationData.user_id = new mongoose.Types.ObjectId(userId)
    console.log(applicationData)
    const data = await createApplication(applicationData)
    response.status(201).json(data)
}


export const getApplicationByName = async(request:AuthenticationRequest , response:Response , next:NextFunction)=>{
    const category:string = String(request.params.category)
    const userId = request.userId!;
    const data = await fetchApplicationByName(userId,category)
    response.status(200).json(data)
}



export const deleteApplication = async(request:AuthenticationRequest , response:Response , next:NextFunction)=>{
    const applicationId:string = String(request.params?.id)
    const userId = request.userId!
    const data = await removeApplication(userId,applicationId)
    response.status(204).send()
}