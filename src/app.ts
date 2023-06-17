import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`)
    io.on("updateData", (data:any) => {
        console.log(data);
    });
});

httpServer.listen(3000, () => {
    console.log("Server started")
});