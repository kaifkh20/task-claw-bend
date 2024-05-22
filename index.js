import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import {bookRouter} from "./router/bookRouter.js";
import {userRouter } from "./router/userRouter.js";
import "./db/db.js"

const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use(userRouter)
app.use(bookRouter)



app.listen(PORT,()=>{
  console.log(`Listening at ${PORT}`)
})
