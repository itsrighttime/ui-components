/**
 * Returns a promise that resolves after a specified delay.
 *
 * @param {number} ms - The number of milliseconds to wait before resolving.
 * @returns {Promise<void>} A promise that resolves after the given delay.
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
