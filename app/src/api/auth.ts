import axios from "axios";
import type {User,  UserCreate, UserLogin } from "../utils/types"
import { baseUrl } from "../config";
import { ACTION_TYPES } from "../reducers/authReducer";


export async function login(dispatch,userData:UserLogin){
    try{
        const res = await axios.post<User>(baseUrl+"/api/users/login",userData)
        dispatch({type:ACTION_TYPES.SET,payload:res.data})
    }catch(e){
        console.log(e)
    }
}

export async function logout(dispatch,apiKey:string){
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

export async function register(dispatch,userData:UserCreate){
    try{
        const res = await axios.post<User>(baseUrl+"/api/users/register",userData)
        dispatch({type:ACTION_TYPES.SET,payload:res.data})
    }catch(e){
        console.log(e)
    }
}
