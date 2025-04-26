import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import socketIO from "socket.io";
import userRoutes from "./routes/userRoutes";
import fileRoutes from "./routes/fileRoutes";
import { SocketEvent } from "./utils/socketEvents";
import * as userController from "./controllers/userController";
import * as fileController from "./controllers/fileController";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    socket.on(SocketEvent.JOIN_REQUEST, userController.joinRequest.bind(null, socket));
    socket.on("disconnecting", userController.disconnecting.bind(null, socket));

    socket.on(SocketEvent.SYNC_FILE_STRUCTURE, fileController.syncFileStructure.bind(null, socket));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
