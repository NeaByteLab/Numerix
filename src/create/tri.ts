import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Create a triangular matrix.
 * @description Builds a matrix filled above or below the diagonal.
 * @param input - Number of rows or an existing matrix
 * @param columns - Number of columns in the matrix
 * @param diagonal - Diagonal offset of the triangle
 * @param method - Triangle side that is filled
 * @returns Triangular matrix
 */
export default function tri(
  input: number | number[][],
  columns?: number | 'mask' | 'lower' | 'upper',
  diagonal?: number | boolean | 'mask' | 'lower' | 'upper',
  method?: 'mask' | 'lower' | 'upper'
): number[][]
/**
 * Create a complex triangular matrix.
 * @description Extracts the upper or lower triangle of a complex matrix.
 * @param input - Existing complex matrix
 * @param columns - Number of columns or triangle mode
 * @param diagonal - Diagonal offset or triangle mode
 * @param method - Triangle side that is filled
 * @returns Complex triangular matrix
 */
export default function tri(
  input: Types.NumerixComplex[][],
  columns?: number | 'mask' | 'lower' | 'upper',
  diagonal?: number | boolean | 'mask' | 'lower' | 'upper',
  method?: 'mask' | 'lower' | 'upper'
): Types.NumerixComplex[][]
/**
 * Create a triangular matrix.
 * @description Builds a matrix filled above or below the diagonal.
 * @param input - Number of rows or an existing matrix
 * @param columns - Number of columns in the matrix
 * @param diagonal - Diagonal offset of the triangle
 * @param method - Triangle side that is filled
 * @returns Triangular matrix
 */
export default function tri(
  input: number | number[][] | Types.NumerixComplex[][],
  columns?: number | 'mask' | 'lower' | 'upper',
  diagonal: number | boolean | 'mask' | 'lower' | 'upper' = 0,
  method?: 'mask' | 'lower' | 'upper'
): number[][] | Types.NumerixComplex[][] {
  if (
    (typeof columns === 'string' && columns !== 'mask' && columns !== 'lower' &&
      columns !== 'upper') ||
    (typeof diagonal === 'string' && diagonal !== 'mask' && diagonal !== 'lower' &&
      diagonal !== 'upper') ||
    (method !== undefined && method !== 'mask' && method !== 'lower' && method !== 'upper')
  ) {
    throw new RangeError("mode must be one of 'mask', 'lower', or 'upper'")
  }
  const columned = columns === 'mask' || columns === 'lower' || columns === 'upper'
  const resolved: 'mask' | 'lower' | 'upper' = method !== undefined
    ? method
    : columned
    ? columns
    : diagonal === 'mask' || diagonal === 'lower' || diagonal === 'upper'
    ? diagonal
    : typeof input === 'number'
    ? 'mask'
    : 'lower'
  const offset = columned
    ? (typeof diagonal === 'number' ? diagonal : 0)
    : typeof input !== 'number' && typeof columns === 'number'
    ? columns
    : (typeof diagonal === 'number' ? diagonal : 0)
  const output = Array.from(
    { length: Math.max(0, typeof input === 'number' ? input : input.length) },
    (_outer, index) =>
      Array.from(
        {
          length: Math.max(
            0,
            typeof input === 'number'
              ? (typeof columns === 'number' ? columns : input)
              : (input[0]?.length ?? 0)
          )
        },
        (_inner, column) =>
          (resolved === 'upper' ? column >= index + offset : column <= index + offset)
            ? (typeof input === 'number' || resolved === 'mask' ? 1 : (input[index]?.[column] ?? 0))
            : 0
      )
  )
  return typeof input !== 'number' && resolved !== 'mask' &&
      Internal.classify(input, true, true) === true
    ? (Internal.nested(output) as Types.NumerixComplex[][])
    : (output as number[][])
}
