import { Server, Socket } from "socket.io";
import http from "http"
import { PlantData } from "./interfaces/PlantData";
import { Plant } from "./interfaces/Plant";

export class SocketSystem {
    private io: Server; 
    private plantsData:Map<string,PlantData>;

    constructor(httpServer: http.Server) {
        this.io = new Server(httpServer, { /* options */ });
        this.plantsData = new Map<string,PlantData>();

        this.io.on("connection", (socket:Socket) => {
            console.log(`New connection: ${socket.id}`)
            socket.on("updateData", (data:any) => {
                console.log(`New Data From: ${socket.id}`);
                data.timestamp = Date.now
                console.log(data);
                this.plantsData.set(socket.id,data);
            });
        });

        this.io.on("disconnect", this.OnDisconnect);
    }
    
    private OnDisconnect(socket:Socket) {
        console.log(`Socket: ${socket.id} disconnected`)
    }

    async ConnectedSockets() {
        var plants = (await this.io.fetchSockets()).map(p => p.id);
        return plants;
    }

    private SendToSocket(socket:Socket, event:string, data?:any[]) {
        socket.emit(event,data);
    }

    WaterPlant(socket:Socket) {
        this.SendToSocket(socket,"waterPlant");
    }

    GetPlantData(plant:string){
        return this.plantsData.get(plant);
    }
};