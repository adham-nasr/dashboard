import jwt from "jsonwebtoken"
import type { JwtPayload } from "../types.js"

const JWT_SECRET = "1234"

export const generateToken = (userInfo:JwtPayload) => {
    return jwt.sign(userInfo,JWT_SECRET,{expiresIn:"3d"})
}

export const verifyToken = (token:string) => {
    return jwt.verify(token,JWT_SECRET) as JwtPayload
}