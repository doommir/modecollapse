/**
 * Safe way to access environment variables in the browser
 * Note: Only variables prefixed with VITE_ are accessible in the browser
 * 
 * @param {string} key - The environment variable key (without the VITE_ prefix)
 * @param {string} fallback - Fallback value if the environment variable is not set
 * @returns {string} The environment variable value or fallback
 */
export function getEnv(key, fallback = '') {
  // Add VITE_ prefix and check if variable exists
  const value = import.meta.env[`VITE_${key}`]
  return value !== undefined ? value : fallback
}

/**
 * Check if we're in production mode
 * @returns {boolean}
 */
export function isProduction() {
  return import.meta.env.PROD === true
}

/**
 * Check if we're in development mode
 * @returns {boolean}
 */
export function isDevelopment() {
  return import.meta.env.DEV === true
} 