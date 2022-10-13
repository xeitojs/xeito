/**
 * Flattens the array of children
 * @param {VNode[]} a Children array
 * @returns 
 */
export function flattenChildren(a) {
  return a.reduce((accumulator, value) => accumulator.concat(value), []);
}
