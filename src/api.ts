import { Router } from "express";
import { SocketSystem } from "./socket";

export class Api {
    socketSystem:SocketSystem;
    readonly router:Router;

    constructor(socketSystem: SocketSystem) {
        this.socketSystem = socketSystem;
        this.router = Router();

        this.router.post("/getPlants",async (req, res) => {
            var sockets = await socketSystem.ConnectedSockets();
            console.log(sockets);
            res.json(sockets);
        });
        
        this.router.post("/getData",(req, res) => {
            if(!req.query["id"])
                return res.sendStatus(404);

            let id = req.query["id"]?.toString()
            res.send(socketSystem.GetPlantData(id));
        });
    }


}