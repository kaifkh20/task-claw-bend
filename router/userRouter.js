import express from "express"
import { User } from "../schema/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const userRouter = express.Router()



userRouter.post('/signup',async(req,res)=>{
  const {username,password} = req.body
  const newUser = new User({username,password})
  try{
    const hashedPassword = await bcrypt.hash(newUser.password,1)
    newUser.password = hashedPassword
    await newUser.save()
    res.status(201).json({"message":"User Successfully Registered"})
  }catch(e){
    console.error(e)
    res.status(500).json({"message":"Error Occured"})
  }
})

userRouter.post('/login',async(req,res)=>{
  const {username,password} = req.body
  try{
    const user = await User.findByCredentials(username,password)
    const access_token = jwt.sign({username:user.username},'secret')
    return res.status(200).json({user,access_token})
  }catch(err){
    console.error(err)
    res.status(500).send({message:"Login Failed"})
  }
})
 
// userRouter.get('/test',isAuthenticated,(req,res)=>{
//   console.log("it working")
// })

userRouter.get('/logout',(req,res,next)=>{
  req.headers.authorization = ""
  res.status(200).send("Logged Out Successfully")
})
