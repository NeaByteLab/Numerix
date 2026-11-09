import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Create a coordinate grid.
 * @description Builds coordinate arrays for each grid axis.
 * @param vertical - Coordinates along the first axis
 * @param columns - Coordinates along the second axis
 * @param indexing - Indexing order of the returned grid
 * @param sparse - When true, returns sparse coordinate grids
 * @returns Grid of coordinate arrays
 */
export default function mesh(
  vertical: number[],
  columns?: number[],
  indexing?: 'xy' | 'ij',
  sparse?: boolean
): number[][][]
/**
 * Create a complex or mixed coordinate grid.
 * @description Builds coordinate arrays for real or complex grid axes.
 * @param vertical - Coordinates along the first axis
 * @param columns - Coordinates along the second axis
 * @param indexing - Indexing order of the returned grid
 * @param sparse - When true, returns sparse coordinate grids
 * @returns Grid of coordinate arrays
 */
export default function mesh(
  vertical: Types.NumerixVector,
  columns?: Types.NumerixVector,
  indexing?: 'xy' | 'ij',
  sparse?: boolean
): (number[][] | Types.NumerixComplex[][])[]
/**
 * Create a coordinate grid.
 * @description Builds coordinate arrays for each grid axis.
 * @param vertical - Coordinates along the first axis
 * @param columns - Coordinates along the second axis
 * @param indexing - Indexing order of the returned grid
 * @param sparse - When true, returns sparse coordinate grids
 * @returns Grid of coordinate arrays
 */
export default function mesh(
  vertical: Types.NumerixVector,
  columns?: Types.NumerixVector,
  indexing: 'xy' | 'ij' = 'xy',
  sparse = false
): (number[][] | Types.NumerixComplex[][])[] {
  if (indexing !== 'xy' && indexing !== 'ij') {
    throw new RangeError("Valid values for `indexing` are 'xy' and 'ij'.")
  }
  if (!columns) {
    return mesh(
      Array.from({ length: (vertical as number[])[0] ?? 0 }, (_outer, index) => index),
      Array.from(
        { length: (vertical as number[])[1] ?? (vertical as number[])[0] ?? 0 },
        (_outer, index) => index
      ),
      'ij',
      sparse
    )
  }
  const first = indexing === 'ij' ? vertical : columns
  const second = indexing === 'ij' ? columns : vertical
  const width = sparse ? 1 : second.length
  const primary = (first as (number | Types.NumerixComplex)[]).map((entry) =>
    typeof entry === 'number'
      ? new Array<number>(width).fill(entry)
      : Array.from({ length: width }, () => ({ re: entry.re, im: entry.im }))
  ) as number[][] | Types.NumerixComplex[][]
  const secondary = Array.from(
    { length: sparse ? 1 : first.length },
    () =>
      Internal.classify(second, true, true) === true
        ? (Internal.nested(second) as Types.NumerixComplex[])
        : (second as number[]).slice()
  ) as number[][] | Types.NumerixComplex[][]
  return indexing === 'ij' ? [primary, secondary] : [secondary, primary]
}
