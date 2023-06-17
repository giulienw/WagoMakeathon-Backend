import { Server, Socket } from "socket.io";
import http from "http"

export class SocketSystem {
    private io: Server; 

    constructor(httpServer: http.Server) {
        this.io = new Server(httpServer, { /* options */ });

        this.io.on("connection", this.OnConnection);

        this.io.on("disconnect", this.OnDisconnect);
    }

    private OnConnection(socket:Socket) {
        console.log(`New connection: ${socket.id}`)
        this.io.on("updateData", (data:any) => {
            console.log(data);
        });
    }

    private OnDisconnect(socket:Socket) {
        console.log(`Socket: ${socket.id} disconnected`)
    }

    ConnectedSockets() {
        return this.io.sockets;
    }
};