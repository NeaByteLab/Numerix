/**
 * Test whether two values are equal.
 * @description Compares nested arrays and their entries.
 * @param left - First value to compare
 * @param right - Second value to compare
 * @returns True when both values match
 */
export default function equals(left: unknown, right: unknown): boolean {
  if (Array.isArray(left) && Array.isArray(right)) {
    const length = left.length
    if (length !== right.length) {
      return false
    }
    for (let index = 0; index < length; index++) {
      if (!equals(left[index], right[index])) {
        return false
      }
    }
    return true
  }
  if (Array.isArray(left) || Array.isArray(right)) {
    return false
  }
  return left === right
}
