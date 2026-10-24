/**
 * Concatenate two strings element-wise.
 * @description Joins matching entries of two string inputs.
 * @param left - First string or array of strings
 * @param right - Second string or array of strings
 * @returns Concatenated strings matching the input shape
 */
export default function add(left: string | string[], right: string | string[]): string | string[] {
  if (Array.isArray(left) && Array.isArray(right)) {
    const length = left.length
    const result = new Array<string>(length)
    for (let index = 0; index < length; index++) {
      result[index] = (left[index] ?? '') + (right[index] ?? '')
    }
    return result
  }
  if (Array.isArray(left)) {
    const length = left.length
    const result = new Array<string>(length)
    for (let index = 0; index < length; index++) {
      result[index] = (left[index] ?? '') + right
    }
    return result
  }
  if (Array.isArray(right)) {
    const length = right.length
    const result = new Array<string>(length)
    for (let index = 0; index < length; index++) {
      result[index] = left + (right[index] ?? '')
    }
    return result
  }
  return left + right
}
