import axios from "axios"
import { baseUrl } from "../utils/config"
import type { Applications, Logs } from "../utils/types";

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

export const deleteApplicationByName = async(name:string,apiKey:string)=>{

    const safeName = encodeURIComponent(name)

    const res = await axios.delete(baseUrl+"/api/applications/"+safeName,{
        headers: {
            Authorization:"Bearer "+apiKey
        },
    })
    return res.data;
} 


export const getLogsByApplicationName = async(name:string,apiKey:string)=>{

    const safeName = encodeURIComponent(name)

    console.log("SAFE NAME = ")
    console.log(safeName)

    const res = await axios.get<Logs>(baseUrl+`/api/applications/${safeName}/logs`,{
        headers: {
            Authorization:"Bearer "+apiKey
        },
    })
    return res.data;
} 



export const createApplication = async(name:string , apiKey:string)=>{
    const res = await axios.post(baseUrl+"/api/applications/",
        {
            name:name
        },
        {
            headers: {
                Authorization:"Bearer "+apiKey
            },
        }
    )
    return res.data;
}