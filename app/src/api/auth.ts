import axios from "axios";
import type {Dispatch, User,  UserCreate, UserLogin } from "../utils/types"
import { baseUrl } from "../config";
import { ACTION_TYPES } from "../reducers/authReducer";


export async function login(dispatch:Dispatch,userData:UserLogin){
    try{
        console.log("Logging IN ... ")
        const res = await axios.post<User>(baseUrl+"/api/users/login",userData)
        console.log("Res " , res)
        dispatch({type:ACTION_TYPES.SET,payload:res.data})
    }catch(e){
        console.log("ERROR !!!")
        console.log(e)
    }
}

export async function logout(dispatch:Dispatch,apiKey:string){
    try{
        await axios.post<User>(baseUrl+"/api/users/logout",{
            headers: {
                Authorization: "Bearer "+apiKey
            }
        })
        dispatch({type:ACTION_TYPES.DELETE})
    }
    catch(e){
        console.log("ERROR ", e)
    }
}

export async function register(dispatch:Dispatch,userData:UserCreate){
    try{
        const res = await axios.post<User>(baseUrl+"/api/users/register",userData)
        dispatch({type:ACTION_TYPES.SET,payload:res.data})
    }catch(e){
        console.log(e)
    }
}
