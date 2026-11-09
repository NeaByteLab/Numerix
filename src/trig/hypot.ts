import * as Internal from '@app/internal/index.ts'

/**
 * Compute the Euclidean distance of two operands.
 * @description Combines operands element-wise with stable square roots.
 * @param first - First operand as a scalar, vector, or matrix
 * @param second - Second operand as a scalar, vector, or matrix
 * @returns Distances matching the broadcast shape of the operands
 */
export default function hypot(
  first: number | number[] | number[][],
  second: number | number[] | number[][] = 0
): number | number[] | number[][] {
  if (typeof second === 'number' && Internal.classify(first, true, true) === false) {
    return typeof first === 'number'
      ? Math.hypot(first, second)
      : Internal.mapper(first, (leading) => Math.hypot(leading, second))
  }
  if (typeof first === 'number' && Internal.classify(second, true, true) === false) {
    return Internal.mapper(second, (trailing) => Math.hypot(first, trailing))
  }
  return Internal.broadcast(first, second, Math.hypot)
}
