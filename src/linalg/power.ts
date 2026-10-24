import * as Internal from '@app/internal/index.ts'
import inv from '@app/linalg/inv.ts'
import matmul from '@app/linalg/matmul.ts'

/**
 * Raise a matrix to a power.
 * @description Uses repeated squaring for the matrix power.
 * @param matrix - Matrix to raise to a power
 * @param exponent - Integer exponent applied to the matrix
 * @returns Matrix raised to the requested power
 */
export default function power(matrix: number[][], exponent: number): number[][] {
  const order = matrix.length
  let remaining = Math.abs(Math.trunc(exponent))
  if (remaining === 0) {
    const identity = new Array<number[]>(order)
    for (let row = 0; row < order; row++) {
      const current = new Array<number>(order).fill(0)
      current[row] = 1
      identity[row] = current
    }
    return identity
  }
  let factor: number[][]
  if (exponent < 0) {
    factor = inv(matrix)
  } else {
    factor = Internal.working(matrix)
  }
  let result: number[][] | undefined
  while (remaining > 0) {
    if ((remaining & 1) === 1) {
      result = result ? matmul(result, factor) : factor
    }
    remaining >>= 1
    if (remaining > 0) {
      factor = matmul(factor, factor)
    }
  }
  return result!
}
