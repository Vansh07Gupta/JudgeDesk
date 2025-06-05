/**
 * View names enum replacement
 * @readonly
 * @enum {string}
 */
const VIEWS = {
  FILES: "FILES",
  CHATS: "CHATS",
  CLIENTS: "CLIENTS",
  RUN: "RUN",
  SETTINGS: "SETTINGS",
};

/**
 * @typedef {Object} ViewContext
 * @property {string} activeView One of the values from VIEWS
 * @property {(activeView: string) => void} setActiveView
 * @property {boolean} isSidebarOpen
 * @property {(isSidebarOpen: boolean) => void} setIsSidebarOpen
 * @property {Object.<string, import('react').ReactElement>} viewComponents
 * @property {Object.<string, import('react').ReactElement>} viewIcons
 */

export { VIEWS };
