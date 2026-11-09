import * as Internal from '@app/internal/index.ts'

/**
 * Compute the greatest common divisor.
 * @description Combines operands with NumPy-style broadcast.
 * @param first - First operand as a scalar, vector, or matrix
 * @param right - Second operand as a scalar, vector, or matrix
 * @returns Divisors matching the broadcast shape of the operands
 */
export default function gcd(
  first: number | number[] | number[][],
  right: number | number[] | number[][]
): number | number[] | number[][] {
  if (typeof right === 'number' && Internal.classify(first, true, true) === false) {
    return Internal.mapper(first, (leading) => {
      if (!Number.isInteger(leading) || !Number.isInteger(right)) {
        throw new TypeError('gcd requires integer operands')
      }
      let dividend = Math.abs(leading)
      let divisor = Math.abs(right)
      if (!Number.isFinite(dividend) || !Number.isFinite(divisor)) {
        return 0
      }
      while (divisor !== 0) {
        ;[dividend, divisor] = [divisor, dividend % divisor]
      }
      return dividend
    })
  }
  return Internal.broadcast(first, right, (first, second) => {
    if (!Number.isInteger(first) || !Number.isInteger(second)) {
      throw new TypeError('gcd requires integer operands')
    }
    let dividend = Math.abs(first)
    let divisor = Math.abs(second)
    if (!Number.isFinite(dividend) || !Number.isFinite(divisor)) {
      return 0
    }
    while (divisor !== 0) {
      ;[dividend, divisor] = [divisor, dividend % divisor]
    }
    return dividend
  })
}
