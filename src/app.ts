import express from "express";
import { createServer } from "http";
import { SocketSystem } from "./socket";
import { Api } from "./api";

const app = express();
const httpServer = createServer(app);
const socketSystem = new SocketSystem(httpServer);
const api = new Api(socketSystem);

app.use("/",api.router);

httpServer.listen(3000, () => {
    console.log("Server started")
});