import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  username :{
    type : String,
    required : true,
    unique : true
  },
  password:{
    type : String,
    required : true
  }
})
userSchema.statics.findByCredentials = async (username,password)=>{
    const user = await User.findOne({username})
    if(!user){
        throw new Error('Login Error')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Password Mismathced')
    }
    return user
}

// userSchema.pre('save',async function(next){
//     const user = this
//     if(user.isModified('password')){
//         user.password = await bcrypt.hash(user.password,5)
//     }
//     next()
// })

export const User = mongoose.model('User',userSchema)
