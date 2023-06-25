
/**
 * Checks if the code is running in the browser by checking if the window object is available.
 * @returns {boolean}
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}
