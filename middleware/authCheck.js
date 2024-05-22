export default function isAuthenticated(req,res,next){
  // console.log(req,res)
  //console.log(req.isAuthenticated,req.isAuthenticated())
  console.log(req.user)
  if(req.isAuthenticated()){
    return next()
  }
  res.status(401).json({message:"Unauthorized, Please Login"})
}
