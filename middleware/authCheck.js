import { User } from '../schema/user.js'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

export const auth = async(req,res,next)=>{
    try{
        const access_token = req.headers.authorization || req.headers.Authorization
        // console.log(access_token)
        const decoded = jwt.verify(access_token,"secret")
        const user = await User.findOne({username:decoded.username})
        // console.log(user)
        if(!user){
            throw new Error('No User Found')
        }
        
        req.user = user
        

        next()
    }catch(e){
        res.status(401).send('Not Authorized')
    }
}

