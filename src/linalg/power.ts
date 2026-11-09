import type * as Types from '@app/types.ts'
import * as Create from '@app/create/index.ts'
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
export default function power(
  matrix: number[][] | Types.NumerixComplex[][],
  exponent: number
): number[][] | Types.NumerixComplex[][] {
  const order = matrix.length
  if (order > 0 && (matrix[0]?.length ?? 0) !== order) {
    throw new RangeError('Last 2 dimensions of the array must be square')
  }
  if (!Number.isInteger(exponent)) {
    throw new TypeError('matrix power requires an integer exponent')
  }
  let remaining = Math.abs(exponent)
  const complex = Internal.classify(matrix, true, true) === true
  if (remaining === 0 || order === 0) {
    const identity = Create.eye(order)
    return (complex ? Internal.nested(identity) : identity) as
      | number[][]
      | Types.NumerixComplex[][]
  }
  let factor = (
    exponent < 0
      ? inv(matrix)
      : complex
      ? Internal.nested(matrix)
      : Internal.working(matrix as number[][])
  ) as number[][] | Types.NumerixComplex[][]
  let result: number[][] | Types.NumerixComplex[][] | undefined
  while (remaining > 0) {
    if ((remaining & 1) === 1) {
      result = result ? (matmul(result, factor) as number[][] | Types.NumerixComplex[][]) : factor
    }
    remaining >>= 1
    if (remaining > 0) {
      factor = matmul(factor, factor) as number[][] | Types.NumerixComplex[][]
    }
  }
  return result!
}
