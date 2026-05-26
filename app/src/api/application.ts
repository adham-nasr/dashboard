import axios from "axios"
import { baseUrl } from "../config"
import type { Applications } from "../utils/types";

export const getApplications = async(apiKey:string)=>{

    const res = await axios.get<Applications>(baseUrl+"/api/applications",{
        headers: {
            Authorization:"Bearer "+apiKey
        }
    })
    return res.data;
}

export const deleteApplicationById = async(id:string,apiKey:string)=>{

    const res = await axios.delete(baseUrl+"/api/applications/"+id,{
        headers: {
            Authorization:"Bearer "+apiKey
        },
    })
    return res.data;
} 

