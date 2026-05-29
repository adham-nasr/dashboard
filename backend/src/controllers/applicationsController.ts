import {  type Request, type Response, type NextFunction, application } from 'express';
import { createApplication, fetchAllApplications, fetchApplicationByName, removeApplicationByName } from '../repositories/applicationsRepository.js';
import type { AuthenticationRequest } from '../types.js';
import type { applicationType } from '../models/application.js';
import mongoose from 'mongoose';
import app from '../app.js';

export const getAllApplications = async (request:AuthenticationRequest , response:Response , next:NextFunction)=>{
    const userId = request.userId!;

    const data = await fetchAllApplications(userId)
    console.log(data)
    response.status(200).json(data)
}

export const postApplication = async (request:AuthenticationRequest , response:Response , next:NextFunction)=>{
    const userId = request.userId!
    const applicationData:applicationType = request.body
    if(!applicationData || !applicationData.name)
        return response.status(400).json({message:"Invalid data"})

    applicationData.user_id = new mongoose.Types.ObjectId(userId)
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
    const applicationName:string = String(request.params?.name)
    const userId = request.userId!
    const data = await removeApplicationByName(userId,applicationName)
    response.status(204).send()
}