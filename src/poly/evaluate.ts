import type * as Types from '@app/types.ts'

/**
 * Evaluate a polynomial at one point.
 * @description Computes a single value using Horner iteration.
 * @param point - Position where the polynomial is evaluated
 * @param coefficients - Coefficients of the source polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Polynomial value at the given point
 */
function evalPoint(
  point: number,
  coefficients: number[],
  basis: Types.NumerixBasis
): number {
  const count = coefficients.length
  if (count === 0) {
    return 0
  }
  if (count === 1) {
    return coefficients[0] ?? 0
  }
  if (basis === 'poly') {
    let accumulated = 0
    for (let power = count - 1; power >= 0; power--) {
      accumulated = accumulated * point + (coefficients[power] ?? 0)
    }
    return accumulated
  }
  let previous = 1
  let current = point
  if (basis === 'herm') {
    current = 2 * point
  } else if (basis === 'lag') {
    current = 1 - point
  }
  let sum = (coefficients[0] ?? 0) * previous + (coefficients[1] ?? 0) * current
  for (let degree = 1; degree < count - 1; degree++) {
    let successor = 0
    if (basis === 'cheb') {
      successor = 2 * point * current - previous
    } else if (basis === 'leg') {
      successor = ((2 * degree + 1) * point * current - degree * previous) / (degree + 1)
    } else if (basis === 'herm') {
      successor = 2 * point * current - 2 * degree * previous
    } else if (basis === 'herme') {
      successor = point * current - degree * previous
    } else if (basis === 'lag') {
      successor = ((2 * degree + 1 - point) * current - degree * previous) / (degree + 1)
    }
    sum += (coefficients[degree + 1] ?? 0) * successor
    previous = current
    current = successor
  }
  return sum
}

/**
 * Evaluate a polynomial at sample points.
 * @description Computes polynomial values using Horner iteration.
 * @param sample - Point or points where the polynomial is evaluated
 * @param coefficients - Coefficients of the source polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Polynomial values at the sample points
 */
export default function evaluate(
  sample: number | number[],
  coefficients: number[],
  basis: Types.NumerixBasis = 'poly'
): number | number[] {
  if (!Array.isArray(sample)) {
    return evalPoint(sample, coefficients, basis)
  }
  const length = sample.length
  const values = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    values[index] = evalPoint(sample[index] ?? 0, coefficients, basis)
  }
  return values
}
