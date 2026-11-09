import type * as Types from '@app/types.ts'
import evaluate from '@app/poly/evaluate.ts'

/**
 * Evaluate a polynomial over a grid.
 * @description Computes polynomial values at grid intersections.
 * @param first - Row positions of the evaluation grid
 * @param columns - Column positions of the evaluation grid
 * @param coefficients - Coefficients of the source polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Evaluated values for each grid row
 */
export default function grid(
  first: (number | Types.NumerixComplex)[] | number | Types.NumerixComplex,
  columns: (number | Types.NumerixComplex)[] | number | Types.NumerixComplex,
  coefficients:
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  basis: Types.NumerixBasis = 'poly'
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  const result = evaluate(
    Array.isArray(columns) ? (columns as number[]) : [columns as number],
    evaluate(
      Array.isArray(first) ? (first as number[]) : [first as number],
      coefficients as number[][],
      basis
    ) as number[][],
    basis
  ) as (number | Types.NumerixComplex)[][]
  if (!Array.isArray(coefficients[0])) {
    return (Array.isArray(columns) ? result : (result[0] ?? 0)) as
      | number
      | number[]
      | Types.NumerixComplex
      | Types.NumerixComplex[]
  }
  if (!Array.isArray(first) && !Array.isArray(columns)) {
    return (result[0]?.[0] ?? 0) as number | Types.NumerixComplex
  }
  if (!Array.isArray(first)) {
    return (result[0] ?? []) as number[] | Types.NumerixComplex[]
  }
  if (!Array.isArray(columns)) {
    return result.map((entry) => entry[0] ?? 0) as number[] | Types.NumerixComplex[]
  }
  return result as number[][] | Types.NumerixComplex[][]
}
