import type * as Types from '@app/types.ts'

/**
 * Build an orthogonal polynomial basis.
 * @description Creates the coefficient matrix of the basis.
 * @param basis - Polynomial basis to generate
 * @param degree - Highest degree included in the basis
 * @returns Basis coefficients for each degree
 */
function buildBasis(basis: Types.NumerixBasis, degree: number): number[][] {
  const size = degree + 1
  const columns = new Array<number[]>(size)
  for (let row = 0; row < size; row++) {
    columns[row] = new Array<number>(size).fill(0)
  }
  const first = columns[0]
  if (first) {
    first[0] = 1
  }
  if (degree === 0) {
    return columns
  }
  const second = columns[1]
  if (second) {
    if (basis === 'herm') {
      second[1] = 2
    } else if (basis === 'lag') {
      second[0] = 1
      second[1] = -1
    } else {
      second[1] = 1
    }
  }
  for (let order = 1; order < degree; order++) {
    const previous = columns[order - 1] ?? []
    const current = columns[order] ?? []
    const following = columns[order + 1] ?? []
    for (let power = 0; power <= order + 1; power++) {
      const shifted = power > 0 ? (current[power - 1] ?? 0) : 0
      const term = current[power] ?? 0
      const last = previous[power] ?? 0
      if (basis === 'cheb') {
        following[power] = 2 * shifted - last
      } else if (basis === 'leg') {
        following[power] = ((2 * order + 1) * shifted - order * last) / (order + 1)
      } else if (basis === 'herm') {
        following[power] = 2 * shifted - 2 * order * last
      } else if (basis === 'herme') {
        following[power] = shifted - order * last
      } else if (basis === 'lag') {
        following[power] = ((2 * order + 1) * term - shifted - order * last) /
          (order + 1)
      } else {
        following[power] = power === order + 1 ? 1 : 0
      }
    }
  }
  return columns
}

/**
 * Convert polynomial coefficients between bases.
 * @description Rewrites coefficients in the requested basis.
 * @param coefficients - Coefficients of the source polynomial
 * @param source - Basis of the given coefficients
 * @param target - Basis of the returned coefficients
 * @returns Coefficients expressed in the target basis
 */
export default function convert(
  coefficients: number[],
  source: Types.NumerixBasis = 'cheb',
  target: Types.NumerixBasis = 'poly'
): number[] {
  if (coefficients.length === 0) {
    return [0]
  }
  if (source === target) {
    return coefficients.slice()
  }
  const degree = coefficients.length - 1
  let result = coefficients.slice()
  if (source !== 'poly') {
    const from = buildBasis(source, degree)
    result = new Array<number>(degree + 1).fill(0)
    for (let order = 0; order <= degree; order++) {
      const coefficient = coefficients[order] ?? 0
      const column = from[order] ?? []
      for (let power = 0; power <= order; power++) {
        result[power] = (result[power] ?? 0) +
          coefficient * (column[power] ?? 0)
      }
    }
  }
  if (target === 'poly') {
    return result
  }
  const to = buildBasis(target, degree)
  const output = new Array<number>(degree + 1).fill(0)
  const remainder = result.slice()
  for (let order = degree; order >= 0; order--) {
    const column = to[order] ?? []
    const leading = column[order] ?? 1
    const factor = (remainder[order] ?? 0) / leading
    output[order] = factor
    for (let power = 0; power <= order; power++) {
      remainder[power] = (remainder[power] ?? 0) - factor * (column[power] ?? 0)
    }
  }
  return output
}
