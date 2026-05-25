import type { Request } from "express";
export type userCredentials = {
    email:string,
    password:string
}

export interface JwtPayload {
    id:string,
    email:string
}

export interface AuthenticationRequest extends Request{
    userId?:string
}