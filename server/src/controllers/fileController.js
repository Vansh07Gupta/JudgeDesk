"use strict";

const { SocketEvent } = require("../types/socket");
const roomService = require("../services/roomService");

/**
 * @param {import('socket.io').Socket} socket 
 * @param {import('socket.io').Server} io 
 * @param {Array} userSocketMap 
 */
function handleFileEvents(socket, io, userSocketMap) {
  socket.on(SocketEvent.SYNC_FILE_STRUCTURE, ({ fileStructure, openFiles, activeFile, socketId }) => {
    io.to(socketId).emit(SocketEvent.SYNC_FILE_STRUCTURE, {
      fileStructure,
      openFiles,
      activeFile,
    });
  });
  socket.on(SocketEvent.FILE_CREATED, ({ parentDirId, newFile }) => {
    const roomId = roomService.getRoomId(userSocketMap, socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.FILE_CREATED, { 
      parentDirId, 
      newFile 
    });
  });
  socket.on(SocketEvent.FILE_UPDATED, ({ fileId, newContent }) => {
    const roomId = roomService.getRoomId(userSocketMap, socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.FILE_UPDATED, {
      fileId,
      newContent,
    });
  });

  socket.on(SocketEvent.FILE_RENAMED, ({ fileId, newName }) => {
    const roomId = roomService.getRoomId(userSocketMap, socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.FILE_RENAMED, {
      fileId,
      newName,
    });
  });
  socket.on(SocketEvent.FILE_DELETED, ({ fileId }) => {
    const roomId = roomService.getRoomId(userSocketMap, socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.FILE_DELETED, { fileId });
  });
}

module.exports = {
  handleFileEvents
};