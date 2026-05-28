import type { SortOrder } from "mongoose";
import { Log, type logType } from "../models/log.js"
import mongoose from "mongoose";



export const fetchAllLogs = async(application_id:string,filters={},sortingAlgo:Record<string,1|-1> = {createdAt:-1}) => {
    const filter_obj = {
        application_id:application_id,
        ...filters

    }
    return await Log.find(filter_obj).sort(sortingAlgo);
}

export const fetchAllLogsByPage = async(application_id:string,limit:number,offset:number,filters={},sortingAlgo:Record<string,1|-1>) => {
    const filter_obj = {
        application_id:application_id,
        ...filters

    }
    return await Log.find(filter_obj).sort(sortingAlgo).limit(limit).skip(offset);
}

export const countLogs = async(application_id:string) => {
    return await Log.aggregate([
        // {
        //     $group:{
        //         _id:'$application_id'
        //     }
        // },
        {
            $match:{
                application_id: new mongoose.Types.ObjectId(application_id)
            }
        },
        {
            $group:{
                _id:null,
                totalCount:{$sum:1},
                errorCount:{
                    $sum :{
                        $cond:[
                            {$eq:["$level","error"]},1,0
                        ]
                    }
               },
               infoCount:{
                    $sum :{
                        $cond:[
                            {$eq:["$level","info"]},1,0
                        ]
                    }
               },
               warnCount:{
                    $sum :{
                        $cond:[
                            {$eq:["$level","warn"]},1,0
                        ]
                    }
               }

            }
        },
        {
            $project:{
                _id:0
            }
         }
    ])
}

export const createLog = async(logData: logType ) => {
    return await Log.create(logData)
}
