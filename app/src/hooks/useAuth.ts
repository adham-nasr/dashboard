import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { UserCreate, UserLogin } from "../utils/types";
import { login, logout, register } from "../api/auth";


export function useAuth(){
    
    const {user,dispatch}= useContext(AuthContext)

    return {
        login:(userData:UserLogin) => {login(dispatch,userData)},
        logout:(apiKey:string) => {logout(dispatch,apiKey)} ,
        register:(userData:UserCreate) => { register(dispatch,userData)},
        user:user
    }
}