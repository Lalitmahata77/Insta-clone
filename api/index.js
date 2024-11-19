import express from "express"
import dotenv from "dotenv"
import dbConnect from "./db/dbConnect.js"
import cookieParser from "cookie-parser"
dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

import userRoute from "./routes/userRoute.js"
import postRoute from "./routes/postRoute.js"
import messageRoute from "./routes/messageRoute.js"
import path from "path"
app.use("/api/user",userRoute)
app.use("/api/post",postRoute)
app.use("/api/message",messageRoute)
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.listen(PORT, ()=>{
    dbConnect()
    console.log(`server is runing on port : ${PORT}`);
    
})