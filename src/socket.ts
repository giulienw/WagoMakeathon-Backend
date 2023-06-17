import { Server, Socket } from "socket.io";
import http from "http"
import { PlantData } from "./interfaces/PlantData";

export class SocketSystem {
    private io: Server; 
    private plantsData:Map<string,PlantData>;

    constructor(httpServer: http.Server) {
        this.io = new Server(httpServer, { /* options */ });
        this.plantsData = new Map<string,PlantData>();

        this.io.on("connection", this.OnConnection);

        this.io.on("disconnect", this.OnDisconnect);
    }

    private OnConnection(socket:Socket) {
        console.log(`New connection: ${socket.id}`)
        socket.on("updateData", (data:any) => {
            console.log(`New Data From: ${socket.id}`);
            this.plantsData.set(socket.id,data);
        });
    }

    private OnDisconnect(socket:Socket) {
        console.log(`Socket: ${socket.id} disconnected`)
    }

    ConnectedSockets() {
        return this.io.sockets;
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