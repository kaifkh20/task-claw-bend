import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD

console.log("Connecting To Database...")
while (1)
{
    await mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.htn6w77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    break
}
console.log("Connected..\/")
