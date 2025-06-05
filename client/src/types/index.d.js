/**
 * @typedef {"file" | "directory"} FileSystemKind
 */

/**
 * @typedef {Object} FileSystemHandle
 * @property {FileSystemKind} kind
 * @property {string} name
 */

/**
 * @typedef {Object} GetFileHandleOptions
 * @property {boolean} [create]
 */

/**
 * @typedef {Object} GetDirectoryHandleOptions
 * @property {boolean} [create]
 */

/**
 * @typedef {Object} FileSystemRemoveOptions
 * @property {boolean} [recursive]
 */

/**
 * @typedef {FileSystemHandle & {
 *   getFile: () => Promise<File>
 * }} FileSystemFileHandle
 */

/**
 * @typedef {FileSystemHandle & {
 *   getFileHandle: (name: string, options?: GetFileHandleOptions) => Promise<FileSystemFileHandle>,
 *   getDirectoryHandle: (name: string, options?: GetDirectoryHandleOptions) => Promise<FileSystemDirectoryHandle>,
 *   removeEntry: (name: string, options?: FileSystemRemoveOptions) => Promise<void>,
 *   resolve: (possibleDescendant: FileSystemHandle) => Promise<string[] | null>,
 *   entries: () => AsyncIterableIterator<[string, FileSystemFileHandle | FileSystemDirectoryHandle]>,
 *   values: () => AsyncIterableIterator<FileSystemFileHandle | FileSystemDirectoryHandle>
 * }} FileSystemDirectoryHandle
 */

/**
 * @typedef {Object} WindowWithDirectoryPicker
 * @property {() => Promise<FileSystemDirectoryHandle>} showDirectoryPicker
 */

// Optional example usage:
// /** @type {WindowWithDirectoryPicker} */
// const win = window;
// win.showDirectoryPicker().then(dirHandle => { /* use dirHandle here */ });
