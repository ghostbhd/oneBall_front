import * as http from "http"
import { Server } from "socket.io"
import RealTimeLogic from "./backend_logic.js"

const port : Number = 4000

const server : http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.write("hihi")
    console.log("sent")
})

server.on("connect", () => {
    console.log("ouii")
})

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

RealTimeLogic(io)
