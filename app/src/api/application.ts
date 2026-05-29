import axios from "axios"
import { baseUrl } from "../utils/config"
import type { Applications, recivedLogs } from "../utils/types";

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


export const getLogsByApplicationName = async(name:string,apiKey:string,filterParams:Record<string,string>)=>{

    const safeName = encodeURIComponent(name)
    let query = "?";
    for(let key in filterParams)
    {
        query+=(key+"="+encodeURIComponent(filterParams[key]))
        query+="&" 
    }
    query = query.slice(0,-1)

    console.log("SAFE NAME = ")
    console.log(safeName)

    const res = await axios.get<recivedLogs>(baseUrl+`/api/applications/${safeName}/logs`+query,{
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