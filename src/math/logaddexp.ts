import * as Internal from '@app/internal/index.ts'

/**
 * Compute the logarithm of summed exponentials.
 * @description Combines operands with NumPy-style broadcast.
 * @param first - First operand as a scalar, vector, or matrix
 * @param right - Second operand as a scalar, vector, or matrix
 * @param binary - When true, computes the base-two logarithm
 * @returns Logarithms matching the broadcast shape of the operands
 */
export default function logaddexp(
  first: number | number[] | number[][],
  right: number | number[] | number[][],
  binary = false
): number | number[] | number[][] {
  if (typeof right === 'number' && Internal.classify(first, true, true) === false) {
    return Internal.mapper(first, (leading) => {
      if (leading === right) {
        return leading + (binary ? 1 : Math.LN2)
      }
      const larger = Math.max(leading, right)
      const delta = Math.min(leading, right) - larger
      return larger +
        (binary ? Math.log1p(Math.pow(2, delta)) / Math.LN2 : Math.log1p(Math.exp(delta)))
    })
  }
  return Internal.broadcast(first, right, (first, second) => {
    if (first === second) {
      return first + (binary ? 1 : Math.LN2)
    }
    const larger = Math.max(first, second)
    const delta = Math.min(first, second) - larger
    return larger +
      (binary ? Math.log1p(Math.pow(2, delta)) / Math.LN2 : Math.log1p(Math.exp(delta)))
  })
}
