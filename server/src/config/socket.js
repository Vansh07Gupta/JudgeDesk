"use strict";
const userController = require("../controllers/userController");
const fileController = require("../controllers/fileController");
const directoryController = require("../controllers/directoryController");
const chatController = require("../controllers/chatController");
const drawingController = require("../controllers/drawingController");
const { SocketEvent } = require("../types/socket");
/**
 * @param {import('socket.io').Server} io 
 */
function setupSocketServer(io) {
  let userSocketMap = [];

  io.on("connection", (socket) => {
    userController.handleConnection(socket, io, userSocketMap);
    fileController.handleFileEvents(socket, io, userSocketMap);
    directoryController.handleDirectoryEvents(socket, io, userSocketMap);
    chatController.handleChatEvents(socket, io, userSocketMap);
    drawingController.handleDrawingEvents(socket, io, userSocketMap);
    socket.on("disconnecting", () => {
      userController.handleDisconnect(socket, io, userSocketMap);
    });
  });

  return io;
}

module.exports = setupSocketServer;