import { Router } from "express";
import { SocketSystem } from "./socket";

const router = Router();

export class Api {
    socketSystem:SocketSystem;

    constructor(socketSystem: SocketSystem) {
        this.socketSystem = socketSystem;

        router.get("getData/:id",(req, res) => {
            res.send(socketSystem.ConnectedSockets);
        });
    }
}