import type {  Request, Response, NextFunction } from 'express';
import { verify } from 'node:crypto';
import { verifyToken } from '../utils/jwt.js';
import { fetchUserByEmail } from '../repositories/userRepository.js';
import type { AuthenticationRequest, JwtPayload } from '../types.js';
import { fetchUserByApiKey } from '../repositories/apiKeyRepository.js';

// export const authenticationMiddleware = async(request:AuthenticationRequest , response:Response , next:NextFunction)=>{
//     try{
//         let {authorization} = request.headers
//         const token = authorization?.split(" ")[1]
//         if(!token)
//             return response.status(401).json({message:"Unauthenticated"})
//         const userPayload = verifyToken(token);
//         request.userPayload = userPayload
//         next()
//     }catch(e){
//         return response.status(401).send("Unauthenticated")
//     }
    
// }

export const authenticationMiddleware = async(request:AuthenticationRequest , response:Response , next:NextFunction)=>{
    try{
        const {authorization} = request.headers
        console.log("Authorization")
        console.log(authorization)
        const token = authorization?.split(" ")[1]
        if(!token)
            return response.status(401).send("Token not found")
        const user = await fetchUserByApiKey(token);
        if(!user || !user.user_id)
            return response.status(401).send("user with this api key not found")
        request.userId = user.user_id.toString();
        next()
    }catch(e){
        console.log(e)
        return response.status(401).send("UnAuthenticated")
    }
}