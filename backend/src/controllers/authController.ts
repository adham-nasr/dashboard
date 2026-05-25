
import type {  Request, Response, NextFunction } from 'express';
import { User } from '../models/user.js';
import { hashPasssword, verifyPassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import { createUser, fetchUserByEmail } from '../repositories/userRepository.js';
import type { AuthenticationRequest } from '../types.js';
import { createApiKey, removeUserKeys } from '../repositories/apiKeyRepository.js';
import { generateApiKey } from '../utils/apiKey.js';

export const register = async(request:Request , response:Response , next:NextFunction) => {
        console.log("body")
        console.log(request.body)
        const {email,password,username} = request.body;
        if( !email || !password)
            return response.status(400).json({message:"Invalid email or password"});
        let user = await fetchUserByEmail(email)
        if(user)
            return response.status(400).json({message:"User Already Exists"})
        user = await createUser({email:email,password:password,username:username});
        // const token = generateToken({email:user.email,id:user.id})
        const apiKey = generateApiKey()
        const res = await createApiKey(user.id,apiKey);
        if(!res)
            return response.status(500).json({message:"Error generating Api Key"})
        return response.status(201).json({user:user,apiKey:apiKey}) 
}

export const login = async (request:Request , response:Response , next:NextFunction) => {
    const {email,password} = request.body;
    console.log("1")
    if(!email || !password)
        return response.status(400).json({message:"Invalid email or password format"})
    console.log("2")

    const user = await fetchUserByEmail(email);
    console.log("USER")
    console.log(user)
    if(!user)
        return response.status(400).json({message:"email not found , register ?"})
    
    console.log("sent password" , password)
    console.log("sent password afrer hash" , await hashPasssword(password))

    const verdict = await verifyPassword(password,user.password!);
    console.log("verdict" , verdict)
    if(!verdict)
        return response.status(400).json({message:"Invalid email or password"})
    
    // const token = generateToken({email:user.email,id:user.id})
    const apiKey = generateApiKey()
    const res = await createApiKey(user.id,apiKey);
    if(!res)
        return response.status(500).json({message:"Error generating Api Key"})
    return response.status(201).json({user:user,apiKey:apiKey}) 
}

export const logout = async (request:AuthenticationRequest , response:Response , next:NextFunction) => {
    const userId = request.userId!;
    console.log(userId)
    const {deletedCount} = await removeUserKeys(userId)
    console.log(deletedCount)
    if(!deletedCount)
        return response.status(400).json({message:"Couldn't log out"})

    return response.status(200).send()
}

