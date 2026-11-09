import shape from '@app/internal/shape.ts'

/**
 * Test whether two values are equal.
 * @description Compares nested arrays and their entries.
 * @param first - First value to compare
 * @param second - Second value to compare
 * @param missing - When true, treats NaN entries as equal
 * @returns True when both values match
 */
export default function equals(first: unknown, second: unknown, missing = false): boolean {
  if (typeof first === 'number' && typeof second === 'number') {
    return first === second || (missing && Number.isNaN(first) && Number.isNaN(second))
  }
  if (Array.isArray(first) && Array.isArray(second)) {
    if (first.length !== second.length) {
      return false
    }
    for (let index = 0; index < first.length; index++) {
      if (!equals(first[index], second[index], missing)) {
        return false
      }
    }
    return true
  }
  if (
    Array.isArray(first) || Array.isArray(second) || first === undefined || second === undefined
  ) {
    return first === second
  }
  const reals = shape(first) ? first.re : Number(first)
  const imags = shape(first) ? first.im : 0
  const alpha = shape(second) ? second.re : Number(second)
  const omega = shape(second) ? second.im : 0
  if (missing) {
    const front = Number.isNaN(reals) || Number.isNaN(imags)
    const after = Number.isNaN(alpha) || Number.isNaN(omega)
    if (front || after) {
      return front && after
    }
  }
  return reals === alpha && imags === omega
}
