import express from "express";
import bodyParser from "body-parser";
import {bookRouter} from "./router/bookRouter.js";
import {userRouter } from "./router/userRouter.js";
import "./db/db.js"

const app = express()

const PORT = process.env.PORT || 3000


app.use(session({
  secret : 'secret',
  resave : false,
  saveUninitialized : true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(userRouter)
app.use(bookRouter)



app.listen(PORT,()=>{
  console.log(`Listening at ${PORT}`)
})
