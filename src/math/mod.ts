import * as Internal from '@app/internal/index.ts'

/**
 * Compute the remainder of a division.
 * @description Combines operands with NumPy-style broadcast.
 * @param first - Dividend as a scalar, vector, or matrix
 * @param right - Divisor as a scalar, vector, or matrix
 * @param method - Remainder convention applied to each quotient
 * @returns Remainders matching the broadcast shape of the operands
 */
export default function mod(
  first: number | number[] | number[][],
  right: number | number[] | number[][] = 1,
  method: boolean | 'fmod' | 'remainder' = false
): number | number[] | number[][] {
  if (typeof method !== 'boolean' && method !== 'fmod' && method !== 'remainder') {
    throw new RangeError("mode must be a boolean, 'fmod', or 'remainder'")
  }
  const truncated = method === true || method === 'fmod'
  if (typeof right === 'number' && Internal.classify(first, true, true) === false) {
    if (truncated) {
      return typeof first === 'number'
        ? first % right
        : Internal.mapper(first, (dividend) => dividend % right)
    }
    return Internal.mapper(first, (dividend) => {
      if (right === 0 || !Number.isFinite(dividend) || Number.isNaN(right)) {
        return NaN
      }
      if (!Number.isFinite(right)) {
        if (dividend === 0) {
          return right < 0 ? -0 : 0
        }
        return (dividend < 0) === (right < 0) ? dividend : right
      }
      const residue = dividend % right
      const remainder = residue !== 0 && (residue < 0) !== (right < 0) ? residue + right : residue
      return remainder === 0 ? (right < 0 ? -0 : 0) : remainder
    })
  }
  return Internal.broadcast(
    first,
    right,
    (dividend, divisor) => {
      if (truncated) {
        return dividend % divisor
      }
      if (divisor === 0 || !Number.isFinite(dividend) || Number.isNaN(divisor)) {
        return NaN
      }
      if (!Number.isFinite(divisor)) {
        if (dividend === 0) {
          return divisor < 0 ? -0 : 0
        }
        return (dividend < 0) === (divisor < 0) ? dividend : divisor
      }
      const residue = dividend % divisor
      const remainder = residue !== 0 && (residue < 0) !== (divisor < 0)
        ? residue + divisor
        : residue
      return remainder === 0 ? (divisor < 0 ? -0 : 0) : remainder
    },
    1
  )
}
