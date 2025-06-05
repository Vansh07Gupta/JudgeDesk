/**
 * User connection status enum replacement
 * @readonly
 * @enum {string}
 */
const USER_CONNECTION_STATUS = {
  OFFLINE: "offline",
  ONLINE: "online",
};

/**
 * User status enum replacement
 * @readonly
 * @enum {string}
 */
const USER_STATUS = {
  INITIAL: "initial",
  CONNECTING: "connecting",
  ATTEMPTING_JOIN: "attempting-join",
  JOINED: "joined",
  CONNECTION_FAILED: "connection-failed",
  DISCONNECTED: "disconnected",
};

/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} roomId
 */

/**
 * @typedef {User & {
 *   status: string,
 *   cursorPosition: number,
 *   typing: boolean,
 *   currentFile: string,
 *   socketId: string
 * }} RemoteUser
 */

export { USER_CONNECTION_STATUS, USER_STATUS };
export const User = {};
export const RemoteUser = {};
