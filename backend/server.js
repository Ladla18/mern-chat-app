import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongo from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import {app,server} from './socket/socket.js'
import cors from "cors"
const PORT = process.env.PORT || 5000;




dotenv.config();
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);





server.listen(PORT, () => {
  connectToMongo();
  console.log(`Your Server running on http://localhost:${PORT}`);
});
