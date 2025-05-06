"use strict";

const { SocketEvent } = require("../types/socket");
const roomService = require("../services/roomService");

/**
 * @param {import('socket.io').Socket} socket 
 * @param {import('socket.io').Server} io
 * @param {Array} userSocketMap
 */
function handleDirectoryEvents(socket, io, userSocketMap) {
  socket.on(SocketEvent.DIRECTORY_CREATED, ({ parentDirId, newDirectory }) => {
    const roomId = roomService.getRoomId(userSocketMap, socket.id);
    if (!roomId) return;
    
    socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_CREATED, {
      parentDirId,
      newDirectory,
    });
  });

  socket.on(SocketEvent.DIRECTORY_UPDATED, ({ dirId, children }) => {
    const roomId = roomService.getRoomId(userSocketMap, socket.id);
    if (!roomId) return;
    
    socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_UPDATED, {
      dirId,
      children,
    });
  });

  socket.on(SocketEvent.DIRECTORY_RENAMED, ({ dirId, newName }) => {
    const roomId = roomService.getRoomId(userSocketMap, socket.id);
    if (!roomId) return;
    
    socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_RENAMED, {
      dirId,
      newName,
    });
  });

  socket.on(SocketEvent.DIRECTORY_DELETED, ({ dirId }) => {
    const roomId = roomService.getRoomId(userSocketMap, socket.id);
    if (!roomId) return;
    
    socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_DELETED, { dirId });
  });
}

module.exports = {
  handleDirectoryEvents
};