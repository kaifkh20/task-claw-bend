import express from "express";
import bodyParser from "body-parser";

import {bookRouter} from "./router/bookRouter.js";
import "./db/db.js"

const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(bookRouter)

app.listen(PORT,()=>{
  console.log(`Listening at ${PORT}`)
})
