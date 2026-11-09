import type * as Types from '@app/types.ts'
import * as Create from '@app/create/index.ts'
import * as Internal from '@app/internal/index.ts'
import * as Linalg from '@app/linalg/index.ts'
import vander from '@app/poly/vander.ts'

/**
 * Fit a polynomial to matrix targets.
 * @description Solves a least-squares system for the coefficients.
 * @param samples - Sample points where the function is evaluated
 * @param targets - Observed target columns at the sample points
 * @param degree - Degree of the fitted polynomial
 * @param basis - Polynomial basis of the fitted coefficients or sample weights
 * @param weights - Optional sample weights for weighted least-squares fitting
 * @returns Coefficients of the fitted polynomials
 */
export default function fit(
  samples: number[],
  targets: number[][],
  degree: number | number[],
  basis?: Types.NumerixBasis | number[],
  weights?: number[] | Types.NumerixBasis
): number[][]
/**
 * Fit a polynomial to sample data.
 * @description Solves a least-squares system for the coefficients.
 * @param samples - Sample points where the function is evaluated
 * @param targets - Observed values at the sample points
 * @param degree - Degree or array of active degrees of the fitted polynomial
 * @param basis - Polynomial basis of the fitted coefficients or sample weights
 * @param weights - Optional sample weights for weighted least-squares fitting
 * @returns Coefficients of the fitted polynomial
 */
export default function fit(
  samples: number[],
  targets: number[],
  degree: number | number[],
  basis?: Types.NumerixBasis | number[],
  weights?: number[] | Types.NumerixBasis
): number[]
/**
 * Fit a complex polynomial.
 * @description Solves a complex least-squares system for the coefficients.
 * @param samples - Sample points where the function is evaluated
 * @param targets - Observed values or target columns at the sample points
 * @param degree - Degree or array of active degrees of the fitted polynomial
 * @param basis - Polynomial basis of the fitted coefficients or sample weights
 * @param weights - Optional sample weights for weighted least-squares fitting
 * @returns Complex coefficients of the fitted polynomial
 */
export default function fit(
  samples: number[] | Types.NumerixComplex[],
  targets: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  degree: number | number[],
  basis?: Types.NumerixBasis | number[],
  weights?: number[] | Types.NumerixBasis
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][]
/**
 * Fit a polynomial to sample data.
 * @description Solves a least-squares system for the coefficients.
 * @param samples - Sample points where the function is evaluated
 * @param targets - Observed values at the sample points
 * @param degree - Degree or array of active degrees of the fitted polynomial
 * @param basis - Polynomial basis of the fitted coefficients or sample weights
 * @param weights - Optional sample weights for weighted least-squares fitting
 * @returns Coefficients of the fitted polynomial
 */
export default function fit(
  samples: number[] | Types.NumerixComplex[],
  targets: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  degree: number | number[],
  basis?: Types.NumerixBasis | number[],
  weights?: number[] | Types.NumerixBasis
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  const scales = Array.isArray(basis) ? basis : Array.isArray(weights) ? weights : undefined
  if (samples.length === 0 || targets.length !== samples.length) {
    throw new RangeError('expected x and y to have same non-zero length')
  }
  if (scales !== undefined && scales.length !== samples.length) {
    throw new RangeError('expected x and w to have same length')
  }
  let highest = 0
  if (Array.isArray(degree)) {
    if (degree.length === 0) {
      throw new TypeError('deg must be an int or non-empty 1-D array of int')
    }
    for (let index = 0; index < degree.length; index++) {
      const power = degree[index] ?? -1
      if (!Number.isInteger(power) || power < 0) {
        throw new RangeError('expected deg >= 0')
      }
      if (power > highest) {
        highest = power
      }
    }
  } else {
    if (!Number.isInteger(degree) || degree < 0) {
      throw new RangeError('expected deg >= 0')
    }
    highest = degree
  }
  const table = vander(
    samples as number[],
    highest,
    typeof basis === 'string' ? basis : typeof weights === 'string' ? weights : 'poly'
  ) as (number | Types.NumerixComplex)[][]
  const design = Array.isArray(degree)
    ? table.map((entry) => degree.map((power) => entry[power] ?? 0))
    : table
  if (scales !== undefined) {
    for (let index = 0; index < design.length; index++) {
      const scale = scales[index] ?? 1
      const slice = design[index]!
      for (let column = 0; column < slice.length; column++) {
        const entry = slice[column]
        slice[column] = typeof entry === 'number'
          ? entry * scale
          : Internal.shape(entry)
          ? { re: entry.re * scale, im: entry.im * scale }
          : Number(entry ?? 0) * scale
      }
    }
  }
  const solved = Linalg.solve(
    design as number[][] | Types.NumerixComplex[][],
    scales !== undefined
      ? ((targets as unknown[]).map((entry, index) => {
        const scale = scales[index] ?? 1
        return Array.isArray(entry)
          ? entry.map((value) =>
            typeof value === 'number'
              ? value * scale
              : Internal.shape(value)
              ? { re: value.re * scale, im: value.im * scale }
              : Number(value ?? 0) * scale
          )
          : typeof entry === 'number'
          ? entry * scale
          : Internal.shape(entry)
          ? { re: entry.re * scale, im: entry.im * scale }
          : Number(entry ?? 0) * scale
      }) as number[])
      : (targets as number[])
  )
  if (!Array.isArray(degree)) {
    return solved
  }
  const output = (
    Array.isArray(solved[0])
      ? Create.zero([highest + 1, solved[0].length])
      : Create.zero(highest + 1)
  ) as unknown[]
  for (let index = 0; index < degree.length; index++) {
    output[degree[index] ?? 0] = (solved as unknown[])[index]
  }
  return (
    Internal.classify(solved, true, true) === true ? Internal.nested(output) : output
  ) as number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][]
}
