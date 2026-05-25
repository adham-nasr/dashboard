import { User, type UserType } from "../models/user.js"
import { hashPasssword } from "../utils/password.js"

export const fetchUserByEmail = async (email:string)=>{
    return await User.findOne({email:email})
}

export const createUser = async (user: UserType) => {
    return await User.create({
        email:user.email,
        password:await hashPasssword(user.password!),
        username:user.username
    })
}