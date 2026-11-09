import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Maths from '@app/math/index.ts'

/**
 * Compute the Kronecker product of matrices.
 * @description Builds a block matrix from scaled copies.
 * @param first - First scalar, vector, or matrix of the product
 * @param right - Second scalar, vector, or matrix of the product
 * @returns Kronecker product of the two inputs
 */
export default function kron(
  first:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  right:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (!Array.isArray(first) && !Array.isArray(right)) {
    return Maths.mul(first, right)
  }
  const source: unknown[][] = !Array.isArray(first)
    ? [[first]]
    : Array.isArray(first[0])
    ? (first as unknown[][])
    : [first as unknown[]]
  const target: unknown[][] = !Array.isArray(right)
    ? [[right]]
    : Array.isArray(right[0])
    ? (right as unknown[][])
    : [right as unknown[]]
  const depth = target.length
  const extent = target[0]?.length ?? 0
  const width = (source[0]?.length ?? 0) * extent
  const result = (
    Internal.classify(source, true, true) !== true &&
      Internal.classify(target, true, true) !== true
      ? Array.from(
        { length: source.length * depth },
        (_outer, index) => {
          const outer = index % depth
          const current = source[(index - outer) / depth]
          const slice = target[outer] ?? []
          return Array.from(
            { length: width },
            (_inner, position) => {
              const offset = position % extent
              return Number(current?.[(position - offset) / extent] ?? 0) *
                Number(slice[offset] ?? 0)
            }
          )
        }
      )
      : Array.from(
        { length: source.length * depth },
        (_outer, index) => {
          const outer = index % depth
          const current = source[(index - outer) / depth]
          const slice = target[outer] ?? []
          return Array.from(
            { length: width },
            (_inner, position) => {
              const offset = position % extent
              const alpha = current?.[(position - offset) / extent]
              const omega = slice[offset]
              const first = Internal.shape(alpha) ? alpha.re : Number(alpha ?? 0)
              const phase = Internal.shape(alpha) ? alpha.im : 0
              const prior = Internal.shape(omega) ? omega.re : Number(omega ?? 0)
              const extra = Internal.shape(omega) ? omega.im : 0
              const reals = first * prior - phase * extra
              const imags = first * extra + phase * prior
              return { re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags }
            }
          )
        }
      )
  ) as number[][] | Types.NumerixComplex[][]
  return !(Array.isArray(first) && Array.isArray(first[0])) &&
      !(Array.isArray(right) && Array.isArray(right[0]))
    ? ((result[0] ?? []) as number[] | Types.NumerixComplex[])
    : result
}
