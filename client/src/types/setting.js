/**
 * @typedef {Object} Settings
 * @property {string} theme
 * @property {string} language
 * @property {number} fontSize
 * @property {string} fontFamily
 * @property {boolean} showGitHubCorner
 */

/**
 * @typedef {Settings & {
 *   setTheme: (theme: string) => void,
 *   setLanguage: (language: string) => void,
 *   setFontSize: (fontSize: number) => void,
 *   setFontFamily: (fontFamily: string) => void,
 *   setShowGitHubCorner: (showGitHubCorner: boolean) => void,
 *   resetSettings: () => void
 * }} SettingsContext
 */

export {};
