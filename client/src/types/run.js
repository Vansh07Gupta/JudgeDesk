/**
 * @typedef {Object} Language
 * @property {string} language
 * @property {string} version
 * @property {string[]} aliases
 */

/**
 * This describes the shape of the RunContext object.
 * Not enforceable in JS, just for documentation/intellisense.
 *
 * RunContext = {
 *   setInput: (input: string) => void,
 *   output: string,
 *   isRunning: boolean,
 *   supportedLanguages: Language[],
 *   selectedLanguage: Language,
 *   setSelectedLanguage: (language: Language) => void,
 *   runCode: () => void
 * }
 */

export {};
