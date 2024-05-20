import mongoose from "mongoose";

 // title author genre year-published

const bookSchema= new mongoose.Schema({
    
    title:{
      type : String,
      required : true
    },
    author:{
      type : String,
      required : true
    },
    genre:{
      type : String,
      required : true
    },
    yearPublished : {
      type : Number,
      required : true
    }
})

export const Books = mongoose.model('Books',bookSchema)
