"use strict";

const { SocketEvent } = require("../types/socket");
const roomService = require("../services/roomService");
/**
 * Handle chat-related socket events
 * @param {import('socket.io').Socket} socket 
 * @param {import('socket.io').Server} io 
 * @param {Array} userSocketMap - 
 */
function handleChatEvents(socket, io, userSocketMap) {
  socket.on(SocketEvent.SEND_MESSAGE, ({ message }) => {
    const roomId = roomService.getRoomId(userSocketMap, socket.id);
    if (!roomId) return;
    
    socket.broadcast.to(roomId).emit(SocketEvent.RECEIVE_MESSAGE, { message });
  });
}

module.exports = {
  handleChatEvents
};