import { randomUUID } from "crypto"


export const generateApiKey = ()=>{
    return Buffer.from(randomUUID()).toString('base64') 
}
