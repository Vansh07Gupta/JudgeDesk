"use strict";

const { SocketEvent } = require("../types/socket");
const roomService = require("../services/roomService");

/**
 * @param {import('socket.io').Socket} socket 
 * @param {import('socket.io').Server} io 
 * @param {Array} userSocketMap 
 */
function handleDrawingEvents(socket, io, userSocketMap) {
  socket.on(SocketEvent.REQUEST_DRAWING, () => {
    const roomId = roomService.getRoomId(userSocketMap, socket.id);
    if (!roomId) return;
    
    socket.broadcast.to(roomId).emit(SocketEvent.REQUEST_DRAWING, { 
      socketId: socket.id 
    });
  });

  socket.on(SocketEvent.SYNC_DRAWING, ({ drawingData, socketId }) => {
    socket.broadcast.to(socketId).emit(SocketEvent.SYNC_DRAWING, { 
      drawingData 
    });
  });

  socket.on(SocketEvent.DRAWING_UPDATE, ({ snapshot }) => {
    const roomId = roomService.getRoomId(userSocketMap, socket.id);
    if (!roomId) return;
    
    socket.broadcast.to(roomId).emit(SocketEvent.DRAWING_UPDATE, {
      snapshot,
    });
  });
}

module.exports = {
  handleDrawingEvents
};