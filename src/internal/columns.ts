import type * as Types from '@app/types.ts'
import column from '@app/internal/column.ts'

/**
 * Apply a transform along columns.
 * @description Transforms each column independently.
 * @template T - Output element type
 * @param matrix - Columns to transform
 * @param transform - Transform applied to each column
 * @returns Transformed matrix
 */
export default function columns<T = Types.NumerixComplex>(
  matrix: (Types.NumerixComplex | number)[][],
  transform: (slice: (Types.NumerixComplex | number)[]) => T[]
): T[][] {
  const height = matrix.length
  const width = matrix[0]?.length ?? 0
  if (width === 0) {
    return Array.from(
      { length: transform(new Array<number>(height).fill(0)).length },
      () => []
    )
  }
  const buffer = new Array<Types.NumerixComplex | number>(height)
  let result: T[][] | undefined
  for (let index = 0; index < width; index++) {
    const output = transform(column(matrix, height, index, buffer, 0))
    const extent = output.length
    if (!result) {
      result = Array.from({ length: extent }, () => new Array<T>(width))
    }
    for (let outer = 0; outer < extent; outer++) {
      const target = result[outer]
      if (target) {
        target[index] = output[outer] as T
      }
    }
  }
  return result ?? []
}
