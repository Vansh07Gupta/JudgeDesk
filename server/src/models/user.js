"use strict";
const { USER_CONNECTION_STATUS } = require("../types/user");
/**
 * @param {string} username 
 * @param {string} roomId
 * @param {string} socketId 
 * @returns {Object} 
 */
function createUser(username, roomId, socketId) {
  return {
    username,
    roomId,
    status: USER_CONNECTION_STATUS.ONLINE,
    cursorPosition: 0,
    typing: false,
    socketId,
    currentFile: null,
  };
}

/**
 * @param {Object} user 
 * @param {string} status
 * @returns {Object} 
 */
function updateUserStatus(user, status) {
  return {
    ...user,
    status
  };
}

/**
 * @param {Object} user
 * @param {boolean} isTyping 
 * @param {number} cursorPosition 
 * @returns {Object}
 */
function updateUserTyping(user, isTyping, cursorPosition = user.cursorPosition) {
  return {
    ...user,
    typing: isTyping,
    cursorPosition: cursorPosition
  };
}
module.exports = {
  createUser,
  updateUserStatus,
  updateUserTyping
};