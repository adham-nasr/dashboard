import jwt from "jsonwebtoken"
import type { JwtPayload } from "../types.js"
import { config } from "../config.js"

const JWT_SECRET = config.jwtSecret

export const generateToken = (userInfo:JwtPayload) => {
    return jwt.sign(userInfo,JWT_SECRET,{expiresIn:"3d"})
}

export const verifyToken = (token:string) => {
    return jwt.verify(token,JWT_SECRET) as JwtPayload
}