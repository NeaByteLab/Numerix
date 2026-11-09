import * as Internal from '@app/internal/index.ts'

/**
 * Compute the least common multiple.
 * @description Combines operands with NumPy-style broadcast.
 * @param first - First operand as a scalar, vector, or matrix
 * @param right - Second operand as a scalar, vector, or matrix
 * @returns Multiples matching the broadcast shape of the operands
 */
export default function lcm(
  first: number | number[] | number[][],
  right: number | number[] | number[][]
): number | number[] | number[][] {
  if (typeof right === 'number' && Internal.classify(first, true, true) === false) {
    return Internal.mapper(first, (leading) => {
      if (!Number.isInteger(leading) || !Number.isInteger(right)) {
        throw new TypeError('lcm requires integer operands')
      }
      const dividend = Math.abs(leading)
      const divisor = Math.abs(right)
      if (dividend === 0 || divisor === 0) {
        return 0
      }
      let alpha = dividend
      let omega = divisor
      while (omega !== 0) {
        ;[alpha, omega] = [omega, alpha % omega]
      }
      return (dividend / alpha) * divisor
    })
  }
  return Internal.broadcast(first, right, (first, second) => {
    if (!Number.isInteger(first) || !Number.isInteger(second)) {
      throw new TypeError('lcm requires integer operands')
    }
    const dividend = Math.abs(first)
    const divisor = Math.abs(second)
    if (dividend === 0 || divisor === 0) {
      return 0
    }
    let alpha = dividend
    let omega = divisor
    while (omega !== 0) {
      ;[alpha, omega] = [omega, alpha % omega]
    }
    return (dividend / alpha) * divisor
  })
}
