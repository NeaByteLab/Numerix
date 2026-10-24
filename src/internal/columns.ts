import type * as Types from '@app/types.ts'

/**
 * Apply a transform along columns.
 * @description Transforms each column independently.
 * @param matrix - Columns to transform
 * @param transform - Transform applied to each column
 * @returns Transformed matrix
 */
export default function columns(
  matrix: (Types.NumerixComplex | number)[][],
  transform: (column: Types.NumerixComplex[]) => Types.NumerixComplex[]
): Types.NumerixComplex[][] {
  const rows = matrix.length
  const columns = matrix[0]?.length ?? 0
  const result = new Array<Types.NumerixComplex[]>(rows)
  for (let row = 0; row < rows; row++) {
    result[row] = new Array<Types.NumerixComplex>(columns)
  }
  const buffer = new Array<Types.NumerixComplex>(rows)
  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      const entry = matrix[row]?.[column]
      buffer[row] = typeof entry === 'number' ? { re: entry, im: 0 } : (entry ?? { re: 0, im: 0 })
    }
    const output = transform(buffer)
    for (let row = 0; row < rows; row++) {
      const target = result[row]
      if (target) {
        target[column] = output[row] ?? { re: 0, im: 0 }
      }
    }
  }
  return result
}
