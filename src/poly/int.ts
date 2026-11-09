import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import convert from '@app/poly/convert.ts'
import evaluate from '@app/poly/evaluate.ts'

/**
 * Integrate a two-dimensional coefficient matrix.
 * @description Applies integration repeatedly to reach the order.
 * @param coefficients - Two-dimensional coefficient matrix
 * @param order - Number of integrations to apply
 * @param constant - Constant term added to the result
 * @param lower - Lower bound used for the integration
 * @param basis - Polynomial basis or scale factor
 * @param output - Target polynomial basis or axis
 * @param level - Axis along which to integrate
 * @returns Integrated two-dimensional coefficient matrix
 */
export default function int(
  coefficients: number[][],
  order?: number,
  constant?: number | number[],
  lower?: number,
  basis?: number | Types.NumerixBasis,
  output?: Types.NumerixBasis | number,
  level?: number
): number[][]
/**
 * Integrate a one-dimensional polynomial.
 * @description Applies integration repeatedly to reach the order.
 * @param coefficients - Coefficients of the source polynomial
 * @param order - Number of integrations to apply
 * @param constant - Constant term added to the result
 * @param lower - Lower bound used for the integration
 * @param basis - Polynomial basis or scale factor
 * @param output - Target polynomial basis when a scale factor is given
 * @param level - Optional axis index
 * @returns Coefficients of the integrated polynomial
 */
export default function int(
  coefficients:
    | (Types.NumerixComplex | number)[]
    | (Types.NumerixComplex | number)[][],
  order?: number,
  constant?: number | Types.NumerixComplex | (number | Types.NumerixComplex)[],
  lower?: number | Types.NumerixComplex,
  basis?: number | Types.NumerixComplex | Types.NumerixBasis,
  output?: Types.NumerixBasis | number,
  level?: number
):
  | number[]
  | number[][]
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][]
/**
 * Integrate a polynomial.
 * @description Applies integration repeatedly to reach the order.
 * @param coefficients - Coefficients of the source polynomial
 * @param order - Number of integrations to apply
 * @param constant - Constant term added to the result
 * @param lower - Lower bound used for the integration
 * @param basis - Polynomial basis or scale factor
 * @param output - Target polynomial basis when a scale factor is given
 * @param level - Axis along which to integrate two-dimensional coefficients
 * @returns Coefficients of the integrated polynomial
 */
export default function int(
  coefficients:
    | (Types.NumerixComplex | number)[]
    | (Types.NumerixComplex | number)[][],
  order = 1,
  constant: number | Types.NumerixComplex | (number | Types.NumerixComplex)[] = 0,
  lower: number | Types.NumerixComplex = 0,
  basis?: number | Types.NumerixComplex | Types.NumerixBasis,
  output?: Types.NumerixBasis | number,
  level = 0
):
  | number[]
  | number[][]
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (!Number.isInteger(order) || order < 0) {
    throw new RangeError('The order of integration must be non-negative')
  }
  const scale: number | Types.NumerixComplex = typeof basis === 'number' || Internal.shape(basis)
    ? (basis as number | Types.NumerixComplex)
    : 1
  const named: Types.NumerixBasis = typeof basis === 'string'
    ? basis
    : typeof output === 'string'
    ? output
    : 'poly'
  if (
    named !== 'poly' &&
    named !== 'cheb' &&
    named !== 'leg' &&
    named !== 'herm' &&
    named !== 'herme' &&
    named !== 'lag'
  ) {
    throw new RangeError("basis must be one of 'poly', 'cheb', 'leg', 'herm', 'herme', or 'lag'")
  }
  const chosen = typeof output === 'number' ? output : level
  const layered = Array.isArray(coefficients[0])
  const normal = chosen < 0 ? (layered ? 2 : 1) + chosen : chosen
  if (normal < 0 || normal > (layered ? 1 : 0)) {
    throw new RangeError(`axis is out of bounds for array of dimension ${layered ? 2 : 1}`)
  }
  const complex = Internal.classify(coefficients, true, true) === true ||
    Internal.classify(constant, true, true) === true ||
    Internal.shape(lower) ||
    Internal.shape(scale)
  if (layered) {
    const matrix = coefficients as (number | Types.NumerixComplex)[][]
    const factor = complex
      ? (Internal.shape(scale) ? scale : { re: Number(scale ?? 0), im: 0 })
      : scale
    if (normal === 1) {
      return matrix.map((slice) => int(slice ?? [], order, constant, lower, factor, named, 0)) as
        | number[][]
        | Types.NumerixComplex[][]
    }
    const height = matrix.length
    const width = matrix[0]?.length ?? 0
    if (width === 0) {
      if (Array.isArray(constant) && constant.length > order) {
        throw new RangeError('Too many integration constants')
      }
      return Array.from({ length: height + order }, () => [])
    }
    const buffer = new Array<number | Types.NumerixComplex>(height)
    const columns = Array.from(
      { length: width },
      (_unused, column) =>
        int(
          Internal.column(matrix, height, column, buffer),
          order,
          constant,
          lower,
          factor,
          named,
          0
        ) as (number | Types.NumerixComplex)[]
    )
    return Array.from(
      { length: columns[0]?.length ?? 0 },
      (_outer, outer) => Array.from({ length: width }, (_inner, column) => columns[column]![outer]!)
    ) as number[][] | Types.NumerixComplex[][]
  }
  if (coefficients.length === 0) {
    throw new RangeError('Coefficient array is empty')
  }
  if (Array.isArray(constant) && constant.length > order) {
    throw new RangeError('Too many integration constants')
  }
  if (order === 0) {
    return complex
      ? (Internal.nested(coefficients) as Types.NumerixComplex[])
      : (coefficients as number[]).slice()
  }
  const direct = !complex && named === 'lag'
  if (!complex) {
    const multiplier = Number(scale ?? 1)
    let current = direct || named === 'poly'
      ? (coefficients as number[])
      : convert(coefficients as number[], named, 'poly')
    for (let round = 0; round < order; round++) {
      const result = Array.from(
        { length: current.length + 1 },
        (_outer, power) =>
          direct
            ? ((current[power] ?? 0) - (current[power - 1] ?? 0)) * multiplier
            : power === 0
            ? 0
            : ((current[power - 1] ?? 0) * multiplier) / power
      )
      const reals = Number(
        Array.isArray(constant) ? (constant[round] ?? 0) : (round === 0 ? constant : 0)
      ) -
        (evaluate(lower as number, result, direct ? 'lag' : 'poly') as number) +
        (direct ? (result[0] ?? 0) : 0)
      result[0] = reals === 0 ? 0 : reals
      current = result
    }
    return direct || named === 'poly' ? current : convert(current, 'poly', named)
  }
  const ratio = Internal.components(scale as number)
  let current: (number | Types.NumerixComplex)[] = named === 'poly'
    ? (coefficients as (number | Types.NumerixComplex)[])
    : convert(coefficients as number[], named, 'poly')
  for (let round = 0; round < order; round++) {
    const result = Array.from<unknown, Types.NumerixComplex>(
      { length: current.length + 1 },
      (_outer, power) => {
        if (power === 0) {
          return { re: 0, im: 0 }
        }
        const entry = current[power - 1]
        const prior = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
        const extra = Internal.shape(entry) ? entry.im : 0
        const reals = (prior * ratio.re - extra * ratio.im) / power
        const imags = (prior * ratio.im + extra * ratio.re) / power
        return {
          re: reals === 0 ? 0 : reals,
          im: imags === 0 ? 0 : imags
        }
      }
    )
    const added = Array.isArray(constant) ? (constant[round] ?? 0) : (round === 0 ? constant : 0)
    const evaluated = evaluate(
      Internal.shape(lower) ? lower : { re: Number(lower ?? 0), im: 0 },
      result as unknown as number[],
      'poly'
    )
    const reals = (Internal.shape(added) ? added.re : Number(added ?? 0)) -
      (Internal.shape(evaluated) ? evaluated.re : Number(evaluated ?? 0))
    const imags = (Internal.shape(added) ? added.im : 0) -
      (Internal.shape(evaluated) ? evaluated.im : 0)
    result[0] = {
      re: reals === 0 ? 0 : reals,
      im: imags === 0 ? 0 : imags
    }
    current = result
  }
  return (named === 'poly' ? current : convert(current as number[], 'poly', named)) as
    | number[]
    | Types.NumerixComplex[]
}
