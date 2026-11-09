import type * as Types from '@app/types.ts'
import * as Create from '@app/create/index.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'
import solve from '@app/linalg/solve.ts'
import svd from '@app/linalg/svd.ts'

/**
 * Compute the inverse of a matrix.
 * @description Uses singular value decomposition for singular or rectangular inputs.
 * @param matrix - Matrix to invert
 * @param pseudo - When true, forces a pseudoinverse
 * @returns Inverse matrix of the input
 */
export default function inv(matrix: number[][], pseudo?: boolean): number[][]
/**
 * Invert a complex matrix.
 * @description Uses Gauss-Jordan elimination over real or complex fields.
 * @param matrix - Matrix to invert
 * @param pseudo - When true, forces a pseudoinverse
 * @returns Inverse matrix of the input
 */
export default function inv(
  matrix: number[][] | Types.NumerixComplex[][],
  pseudo?: boolean
): number[][] | Types.NumerixComplex[][]
/**
 * Compute the inverse of a matrix.
 * @description Uses singular value decomposition for singular or rectangular inputs.
 * @param matrix - Matrix to invert
 * @param pseudo - When true, forces a pseudoinverse
 * @returns Inverse matrix of the input
 */
export default function inv(
  matrix: number[][] | Types.NumerixComplex[][],
  pseudo = false
): number[][] | Types.NumerixComplex[][] {
  const height = matrix.length
  const extent = matrix[0]?.length ?? 0
  if (!pseudo && height !== extent) {
    throw new RangeError('Last 2 dimensions of the array must be square')
  }
  if (pseudo) {
    if (height === 0 || extent === 0) {
      return Shape.transpose(matrix as number[][])
    }
    const factors = svd(matrix, false) as {
      U: (number | Types.NumerixComplex)[][]
      S: number[]
      Vt: (number | Types.NumerixComplex)[][]
    }
    const scales = factors.S.map((singular) =>
      singular > (factors.S[0] ?? 0) * 1e-12 ? 1 / singular : 0
    )
    if (Internal.classify(matrix, true, true) !== true) {
      return Array.from(
        { length: extent },
        (_outer, outer) =>
          Array.from({ length: height }, (_inner, column) => {
            let reals = 0
            for (let cursor = 0; cursor < scales.length; cursor++) {
              const scale = scales[cursor] ?? 0
              if (scale !== 0) {
                reals += Number(factors.Vt[cursor]?.[outer] ?? 0) *
                  Number(factors.U[column]?.[cursor] ?? 0) * scale
              }
            }
            return reals
          })
      )
    }
    return Array.from(
      { length: extent },
      (_outer, outer) =>
        Array.from({ length: height }, (_inner, column) => {
          let reals = 0
          let imags = 0
          for (let cursor = 0; cursor < scales.length; cursor++) {
            const scale = scales[cursor] ?? 0
            if (scale !== 0) {
              const right = factors.Vt[cursor]?.[outer]
              const first = factors.U[column]?.[cursor]
              const alpha = Internal.shape(right) ? right.re : Number(right ?? 0)
              const gamma = Internal.shape(right) ? -right.im : 0
              const omega = Internal.shape(first) ? first.re : Number(first ?? 0)
              const extra = Internal.shape(first) ? -first.im : 0
              reals += (alpha * omega - gamma * extra) * scale
              imags += (alpha * extra + gamma * omega) * scale
            }
          }
          return { re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags }
        })
    ) as Types.NumerixComplex[][]
  }
  try {
    return solve(matrix, Create.eye(height), true) as number[][] | Types.NumerixComplex[][]
  } catch {
    throw new RangeError('matrix is singular')
  }
}
