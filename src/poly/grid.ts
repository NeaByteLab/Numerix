import type * as Types from '@app/types.ts'
import evaluate from '@app/poly/evaluate.ts'

/**
 * Evaluate a polynomial over a grid.
 * @description Computes polynomial values at grid intersections.
 * @param rows - Row positions of the evaluation grid
 * @param columns - Column positions of the evaluation grid
 * @param coefficients - Coefficients of the source polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Evaluated values for each grid row
 */
export default function grid(
  rows: number[],
  columns: number[],
  coefficients: number[][],
  basis: Types.NumerixBasis = 'poly'
): number[][] {
  const height = rows.length
  const width = columns.length
  const count = coefficients.length
  const evaluated = new Array<number[]>(count)
  for (let row = 0; row < count; row++) {
    evaluated[row] = evaluate(
      columns,
      coefficients[row] ?? [],
      basis
    ) as number[]
  }
  const column = new Array<number>(count)
  const result = new Array<number[]>(height)
  for (let index = 0; index < height; index++) {
    result[index] = new Array<number>(width)
  }
  for (let index = 0; index < width; index++) {
    for (let row = 0; row < count; row++) {
      column[row] = evaluated[row]?.[index] ?? 0
    }
    const line = evaluate(rows, column, basis) as number[]
    for (let position = 0; position < height; position++) {
      const output = result[position]
      if (output) {
        output[index] = line[position] ?? 0
      }
    }
  }
  return result
}
