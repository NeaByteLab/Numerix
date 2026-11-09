import * as Internal from '@app/internal/index.ts'

/**
 * Multiply by powers of two.
 * @description Combines operands with NumPy-style broadcast.
 * @param first - Mantissa operand as a scalar, vector, or matrix
 * @param right - Exponent operand as a scalar, vector, or matrix
 * @returns Scaled values matching the broadcast shape of the operands
 */
export default function ldexp(
  first: number | number[] | number[][],
  right: number | number[] | number[][] = 0
): number | number[] | number[][] {
  if (typeof right === 'number' && Internal.classify(first, true, true) === false) {
    if (!Number.isInteger(right)) {
      throw new TypeError('ldexp exponent must be an integer')
    }
    const quarter = Math.max(-600, Math.min(600, Math.trunc(right / 4)))
    const factor = 2 ** quarter
    const remainder = 2 ** Math.max(-600, Math.min(600, right - 3 * quarter))
    if (typeof first === 'number') {
      return first === 0 || !Number.isFinite(first) || right === 0
        ? first
        : first * factor * factor * factor * remainder
    }
    return Internal.mapper(
      first,
      (entry) =>
        entry === 0 || !Number.isFinite(entry) || right === 0
          ? entry
          : entry * factor * factor * factor * remainder
    )
  }
  return Internal.broadcast(first, right, (first, second) => {
    if (!Number.isInteger(second)) {
      throw new TypeError('ldexp exponent must be an integer')
    }
    if (first === 0 || !Number.isFinite(first) || second === 0) {
      return first
    }
    const quarter = Math.max(-600, Math.min(600, Math.trunc(second / 4)))
    const factor = 2 ** quarter
    return first * factor * factor * factor *
      2 ** Math.max(-600, Math.min(600, second - 3 * quarter))
  })
}
