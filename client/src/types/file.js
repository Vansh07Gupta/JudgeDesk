/**
 * @typedef {string} Id
 * @typedef {string} FileName
 * @typedef {string} FileContent
 */

/**
 * @typedef {Object} FileSystemItem
 * @property {string} id
 * @property {FileName} name
 * @property {"file" | "directory"} type
 * @property {FileSystemItem[]} [children]
 * @property {FileContent} [content]
 * @property {boolean} [isOpen]
 */


export {};
