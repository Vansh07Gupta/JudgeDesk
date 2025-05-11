"use strict";
/**
 * @param {Array} userSocketMap
 * @param {string} roomId 
 * @returns {Array} 
 */
function getUsersInRoom(userSocketMap, roomId) {
  return userSocketMap.filter((user) => user.roomId === roomId);
}
/**
 * @param {Array} userSocketMap 
 * @param {string} socketId
 * @returns {string|null} 
 */
function getRoomId(userSocketMap, socketId) {
  const roomId = userSocketMap.find((user) => user.socketId === socketId)?.roomId;
  if (!roomId) {
    console.error("Room ID is undefined for socket ID:", socketId);
    return null;
  }
  return roomId;
}
/**
 * @param {Array} userSocketMap 
 * @param {string} socketId 
 * @returns {Object|null} 
 */
function getUserBySocketId(userSocketMap, socketId) {
  const user = userSocketMap.find((user) => user.socketId === socketId);
  if (!user) {
    console.error("User not found for socket ID:", socketId);
    return null;
  }
  return user;
}

module.exports = {
  getUsersInRoom,
  getRoomId,
  getUserBySocketId
};