/**
 * Report whether a value is numeric.
 * @description Scans a value to confirm every element is numeric.
 * @param value - Value to inspect
 * @returns True when the value is an array containing only numbers
 */
export default function numeric(value: unknown): value is number[] {
  if (!Array.isArray(value)) {
    return false
  }
  for (let index = 0; index < value.length; index++) {
    if (typeof value[index] !== 'number') {
      return false
    }
  }
  return true
}
