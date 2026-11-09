import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'
import zero from '@app/create/zero.ts'

/**
 * Extract a matrix diagonal.
 * @description Reads or writes entries along the diagonal.
 * @param input - Vector or matrix from which to read
 * @param offset - Diagonal offset used for the extraction
 * @param vector - When true, treats the input as a flat vector
 * @returns Diagonal entries or matrix holding them
 */
export default function diag(
  input: number[],
  offset?: number,
  vector?: boolean
): number[][]
/**
 * Extract or build a diagonal.
 * @description Reads or writes entries along the diagonal.
 * @param input - Vector or matrix from which to read
 * @param offset - Diagonal offset used for the extraction
 * @param vector - When true, treats the input as a flat vector
 * @returns Diagonal entries or matrix holding them
 */
export default function diag(
  input: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  offset?: number,
  vector?: boolean
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][]
/**
 * Extract a matrix diagonal.
 * @description Reads or writes entries along the diagonal.
 * @param input - Vector or matrix from which to read
 * @param offset - Diagonal offset used for the extraction
 * @param vector - When true, treats the input as a flat vector
 * @returns Diagonal entries or matrix holding them
 */
export default function diag(
  input: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  offset = 0,
  vector = false
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (Array.isArray(input[0]) && !vector) {
    return Internal.diagonal<number | Types.NumerixComplex>(
      input as (number | Types.NumerixComplex)[][],
      offset,
      0
    ) as number[] | Types.NumerixComplex[]
  }
  const series = Array.isArray(input[0])
    ? Shape.flatten<number | Types.NumerixComplex>(input)
    : (input as (number | Types.NumerixComplex)[])
  const order = series.length + Math.abs(offset)
  const matrix = zero([order, order]) as (number | Types.NumerixComplex)[][]
  let complex = false
  for (let index = 0; index < series.length; index++) {
    const entry = series[index] ?? 0
    if (Internal.shape(entry)) {
      complex = true
    }
    const current = matrix[index + (offset < 0 ? -offset : 0)]
    if (current) {
      current[index + (offset > 0 ? offset : 0)] = entry
    }
  }
  return (complex ? Internal.nested(matrix) : matrix) as number[][] | Types.NumerixComplex[][]
}
