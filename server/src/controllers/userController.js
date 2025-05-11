"use strict";
const { SocketEvent } = require("../types/socket");
const { USER_CONNECTION_STATUS } = require("../types/user");
const roomService = require("../services/roomService");
/**
 * @param {import('socket.io').Socket} socket 
 * @param {import('socket.io').Server} io
 * @param {Array} userSocketMap 
 */
function handleConnection(socket, io, userSocketMap) {
  socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, username }) => {
    const isUsernameExist = roomService.getUsersInRoom(userSocketMap, roomId)
      .filter((u) => u.username === username);
    if (isUsernameExist.length > 0) {
      io.to(socket.id).emit(SocketEvent.USERNAME_EXISTS);
      return;
    }
    const user = {
      username,
      roomId,
      status: USER_CONNECTION_STATUS.ONLINE,
      cursorPosition: 0,
      typing: false,
      socketId: socket.id,
      currentFile: null,
    };
    userSocketMap.push(user);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user });
    const users = roomService.getUsersInRoom(userSocketMap, roomId);
    io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users });
  });
  handleUserStatusEvents(socket, io, userSocketMap);
  handleTypingEvents(socket, io, userSocketMap);
}

/**
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io').Server} io 
 * @param {Array} userSocketMap 
 */
function handleDisconnect(socket, io, userSocketMap) {
  const user = roomService.getUserBySocketId(userSocketMap, socket.id);
  if (!user) return;
  const roomId = user.roomId;
  socket.broadcast.to(roomId).emit(SocketEvent.USER_DISCONNECTED, { user });
  
  const index = userSocketMap.findIndex((u) => u.socketId === socket.id);
  if (index !== -1) {
    userSocketMap.splice(index, 1);
  }
  
  socket.leave(roomId);
}

/**
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io').Server} io 
 * @param {Array} userSocketMap 
 */
function handleUserStatusEvents(socket, io, userSocketMap) {
  socket.on(SocketEvent.USER_OFFLINE, ({ socketId }) => {
    userSocketMap.forEach((user, index) => {
      if (user.socketId === socketId) {
        userSocketMap[index].status = USER_CONNECTION_STATUS.OFFLINE;
      }
    });

    const roomId = roomService.getRoomId(userSocketMap, socketId);
    if (!roomId) return;
    
    socket.broadcast.to(roomId).emit(SocketEvent.USER_OFFLINE, { socketId });
  });

  socket.on(SocketEvent.USER_ONLINE, ({ socketId }) => {
    userSocketMap.forEach((user, index) => {
      if (user.socketId === socketId) {
        userSocketMap[index].status = USER_CONNECTION_STATUS.ONLINE;
      }
    });

    const roomId = roomService.getRoomId(userSocketMap, socketId);
    if (!roomId) return;
    
    socket.broadcast.to(roomId).emit(SocketEvent.USER_ONLINE, { socketId });
  });
}

/**
 * Handle typing events
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io').Server} io
 * @param {Array} userSocketMap 
 */
function handleTypingEvents(socket, io, userSocketMap) {
  socket.on(SocketEvent.TYPING_START, ({ cursorPosition }) => {
    userSocketMap.forEach((user, index) => {
      if (user.socketId === socket.id) {
        userSocketMap[index].typing = true;
        userSocketMap[index].cursorPosition = cursorPosition;
      }
    });

    const user = roomService.getUserBySocketId(userSocketMap, socket.id);
    if (!user) return;
    
    const roomId = user.roomId;
    socket.broadcast.to(roomId).emit(SocketEvent.TYPING_START, { user });
  });

  socket.on(SocketEvent.TYPING_PAUSE, () => {
    userSocketMap.forEach((user, index) => {
      if (user.socketId === socket.id) {
        userSocketMap[index].typing = false;
      }
    });

    const user = roomService.getUserBySocketId(userSocketMap, socket.id);
    if (!user) return;
    
    const roomId = user.roomId;
    socket.broadcast.to(roomId).emit(SocketEvent.TYPING_PAUSE, { user });
  });
}

module.exports = {
  handleConnection,
  handleDisconnect,
  handleUserStatusEvents,
  handleTypingEvents
};