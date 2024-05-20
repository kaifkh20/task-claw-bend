import express from "express";
import { Books } from "../schema/books.js";
import mongoose from "mongoose";

export const bookRouter = express.Router()

bookRouter.get('/books',async(req,res)=>{
  try{
    const books = await Books.find({})
    res.status(200).send(books)
    
  }catch(err){
    res.status(500).send(`Error 500: An Error Occured`)
    console.error(err)
  }
 // res.json("All Books Recieved")
})

bookRouter.get('/books/:id',async(req,res)=>{
  const id = req.params.id
  // console.log(id)
  try{
    const book = await Books.findById(id,'title author genre yearPublished')
    // console.log(book)
    res.status(200).send(book)
  }catch(err){
    res.status(500).send(`Error 500: An Error Occured`)
    console.error(err)
  }
  // res.json(`One book got ${id}`)
})

bookRouter.post('/books',async(req,res)=>{
  const {title,author,genre,year} = req.body
  try{
    const book = new Books({title,author,genre,yearPublished:year})
    await book.save()
    res.status(200).send(book)
  }catch(err){
    res.status(500).send(`Error 500: An Error Occured while adding Book`)
    console.error(err)
  }

  // res.json(`New Book Added ${title,author,genre,year}`)
})

bookRouter.put('/books/:id',async(req,res)=>{
  const id = req.params.id
  const body = req.body
  try{
    const book = await Books.findByIdAndUpdate(id,body).select('title author genre yearPublished')
    res.status(200).send(book)
  }catch(err){
    res.status(500).send(`Error 500: An Error Occured while Updating`)
    console.error(err)
  }
  // res.json(`Book updated with ${id}`)
})

bookRouter.delete('/books/:id',async(req,res)=>{
  const id = req.params.id
  try{
    await Books.findByIdAndDelete(id)
    res.status(200).send(`Book Deleted Succesfully`)
  }catch(e){
    res.status(500).send(`Error 500: An Error Occured`)
    console.error(err)
  }
  // res.json(`Book deleted with ${id}`)
})

