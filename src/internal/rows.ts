import type * as Types from '@app/types.ts'

/**
 * Apply a transform along rows.
 * @description Transforms each row independently.
 * @param matrix - Rows to transform
 * @param transform - Transform applied to each row
 * @returns Transformed matrix
 */
export default function rows(
  matrix: (Types.NumerixComplex | number)[][],
  transform: (row: (Types.NumerixComplex | number)[]) => Types.NumerixComplex[]
): Types.NumerixComplex[][] {
  const rows = matrix.length
  const result = new Array<Types.NumerixComplex[]>(rows)
  for (let row = 0; row < rows; row++) {
    result[row] = transform(matrix[row] ?? [])
  }
  return result
}
