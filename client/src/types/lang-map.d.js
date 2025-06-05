// Importing the module
import langMap from "lang-map";

// Example usage:
// Get languages for a file extension
const langs = langMap.languages("js"); // ['JavaScript']

// Get extensions for a language
const exts = langMap.extensions("Python"); // ['py']

/**
 * Optional JSDoc for better IDE support
 * 
 * @typedef {Object} LangMap
 * @property {{ [key: string]: string[] }} languages
 * @property {{ [key: string]: string[] }} extensions
 */

/**
 * @type {{
 *   languages: (ext: string) => string[],
 *   extensions: (lang: string) => string[]
 * }}
 */
const lang = langMap;
