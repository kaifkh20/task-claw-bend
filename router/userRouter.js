import express from "express"
import { User } from "../schema/user.js"
import bcrypt from "bcryptjs"
import passport from "passport"
import { Strategy } from "passport-local"
import session from "express-session"
import isAuthenticated from "../middleware/authCheck.js"

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

userRouter.post('/login',  (req,res,next)=>{
    passport.authenticate('local',(err,user)=>{
    console.log(err,user)
    if(err){
      return res.status(500).json({"message":"An error occured during authentication"})
    }
    if(!user){
      return res.status(401).json({"message":"Incorrect username or password"})
    }
    req.logIn(user,(err)=>{
      if(err) return res.status(500).json({"message":"An error occured during login"})
      return res.status(200).json({"message":"Login Successfull"})
    })

  })(req,res,next)
})
 
// userRouter.get('/test',isAuthenticated,(req,res)=>{
//   console.log("it working")
// })

userRouter.get('/logout',(req,res,next)=>{
  req.logOut(req.user,(err)=>{
    if(err) return next(err)
  })
  res.status(200).json({message:"Logout Successfull"})
})
