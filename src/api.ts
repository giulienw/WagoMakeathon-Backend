import { Router } from "express";
import { SocketSystem } from "./socket";

export class Api {
    socketSystem:SocketSystem;
    readonly router:Router;

    constructor(socketSystem: SocketSystem) {
        this.socketSystem = socketSystem;
        this.router = Router();

        this.router.use("/", (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
              "Access-Control-Allow-Headers",
              "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );

            if (req.method == "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
                return res.status(200).json({});
              }

              next();
        });

        this.router.post("/getPlants",async (req, res) => {
            var sockets = await socketSystem.ConnectedSockets();
        
            console.log(sockets);
            res.json(sockets);
        });
        
        this.router.post("/getData",(req, res) => {
            if(!req.query["id"])
                return res.sendStatus(404);

            let id = req.query["id"]?.toString()
            let plant = socketSystem.GetPlantData(id)

            console.log(socketSystem.GetPlantData(id))
            res.send(plant);
        });
    }


}