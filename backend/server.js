import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path'
import connectToMongo from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import {app,server} from './socket/socket.js'

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


dotenv.config();
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"frontend/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT, () => {
  connectToMongo();
  console.log(`Your Server running on http://localhost:${PORT}`);
});
