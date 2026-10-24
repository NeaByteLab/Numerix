import type * as Types from '@app/types.ts'

/**
 * Apply a transform along every axis.
 * @description Transforms each row, then each column.
 * @param matrix - Rows to transform
 * @param rowTransform - Transform applied to each row
 * @param columnTransform - Transform applied to each column
 * @param width - Width of the produced matrix
 * @returns Transformed matrix
 */
export default function matrix(
  matrix: (Types.NumerixComplex | number)[][],
  rowTransform: (row: (Types.NumerixComplex | number)[]) => Types.NumerixComplex[],
  columnTransform: (column: Types.NumerixComplex[]) => Types.NumerixComplex[],
  width?: number
): Types.NumerixComplex[][] {
  const rows = matrix.length
  const columns = width ?? matrix[0]?.length ?? 0
  const transformed = new Array<Types.NumerixComplex[]>(rows)
  for (let row = 0; row < rows; row++) {
    transformed[row] = rowTransform(matrix[row] ?? [])
  }
  const result = new Array<Types.NumerixComplex[]>(rows)
  for (let row = 0; row < rows; row++) {
    result[row] = new Array<Types.NumerixComplex>(columns)
  }
  const buffer = new Array<Types.NumerixComplex>(rows)
  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      buffer[row] = transformed[row]?.[column] ?? { re: 0, im: 0 }
    }
    const output = columnTransform(buffer)
    for (let row = 0; row < rows; row++) {
      const target = result[row]
      if (target) {
        target[column] = output[row] ?? { re: 0, im: 0 }
      }
    }
  }
  return result
}
