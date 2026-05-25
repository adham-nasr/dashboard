import { Log, type logType } from "../models/log.js"



export const fetchAllLogs = async(application_id:string) => {
    return await Log.find({application_id:application_id});
}

export const createLog = async(logData: logType ) => {
    return await Log.create(logData)
}
