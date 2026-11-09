import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import convert from '@app/poly/convert.ts'

/**
 * Differentiate a two-dimensional coefficient matrix.
 * @description Applies differentiation repeatedly to reach the order.
 * @param coefficients - Two-dimensional coefficient matrix
 * @param order - Number of derivatives to apply
 * @param scale - Scaling factor applied to each derivative
 * @param basis - Polynomial basis or axis index
 * @param level - Axis along which to differentiate
 * @returns Differentiated two-dimensional coefficient matrix
 */
export default function der(
  coefficients: number[][],
  order?: number,
  scale?: number,
  basis?: Types.NumerixBasis | number,
  level?: number
): number[][]
/**
 * Differentiate a one-dimensional polynomial.
 * @description Applies differentiation repeatedly to reach the order.
 * @param coefficients - Coefficients of the source polynomial
 * @param order - Number of derivatives to apply
 * @param scale - Scaling factor applied to each derivative
 * @param basis - Polynomial basis of the coefficients
 * @param level - Optional axis index
 * @returns Coefficients of the differentiated polynomial
 */
export default function der(
  coefficients:
    | (Types.NumerixComplex | number)[]
    | (Types.NumerixComplex | number)[][],
  order?: number,
  scale?: number | Types.NumerixComplex,
  basis?: Types.NumerixBasis | number,
  level?: number
):
  | number[]
  | number[][]
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][]
/**
 * Differentiate a polynomial.
 * @description Applies differentiation repeatedly to reach the order.
 * @param coefficients - Coefficients of the source polynomial
 * @param order - Number of derivatives to apply
 * @param scale - Scaling factor applied to each derivative
 * @param basis - Polynomial basis of the coefficients or axis
 * @param level - Axis along which to differentiate two-dimensional coefficients
 * @returns Coefficients of the differentiated polynomial
 */
export default function der(
  coefficients:
    | (Types.NumerixComplex | number)[]
    | (Types.NumerixComplex | number)[][],
  order = 1,
  scale: number | Types.NumerixComplex = 1,
  basis: Types.NumerixBasis | number = 'poly',
  level = 0
):
  | number[]
  | number[][]
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (!Number.isInteger(order) || order < 0) {
    throw new RangeError('The order of derivation must be non-negative')
  }
  const named: Types.NumerixBasis = typeof basis === 'string' ? basis : 'poly'
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
  const chosen = typeof basis === 'number' ? basis : level
  const layered = Array.isArray(coefficients[0])
  const normal = chosen < 0 ? (layered ? 2 : 1) + chosen : chosen
  if (normal < 0 || normal > (layered ? 1 : 0)) {
    throw new RangeError(`axis is out of bounds for array of dimension ${layered ? 2 : 1}`)
  }
  const complex = Internal.classify(coefficients, true, true) === true || Internal.shape(scale)
  if (layered) {
    const matrix = coefficients as (number | Types.NumerixComplex)[][]
    const factor = complex
      ? (Internal.shape(scale) ? scale : { re: Number(scale ?? 0), im: 0 })
      : scale
    if (normal === 1) {
      return matrix.map((slice) => der(slice ?? [], order, factor, named, 0)) as
        | number[][]
        | Types.NumerixComplex[][]
    }
    const height = matrix.length
    const width = matrix[0]?.length ?? 0
    if (width === 0) {
      return Array.from({ length: Math.max(1, height - order) }, () => [])
    }
    const buffer = new Array<number | Types.NumerixComplex>(height)
    const columns = Array.from(
      { length: width },
      (_unused, column) =>
        der(Internal.column(matrix, height, column, buffer), order, factor, named, 0) as (
          | number
          | Types.NumerixComplex
        )[]
    )
    return Array.from(
      { length: columns[0]?.length ?? 0 },
      (_outer, outer) => Array.from({ length: width }, (_inner, column) => columns[column]![outer]!)
    ) as number[][] | Types.NumerixComplex[][]
  }
  if (coefficients.length === 0) {
    return []
  }
  if (order === 0) {
    return complex
      ? (Internal.nested(coefficients) as Types.NumerixComplex[])
      : (coefficients as number[]).slice()
  }
  const ratio = Internal.components(scale as number)
  const source: (number | Types.NumerixComplex)[] = named === 'poly'
    ? (coefficients as (number | Types.NumerixComplex)[])
    : convert(coefficients as number[], named, 'poly')
  if (!complex) {
    let series = (named === 'poly' ? source.slice() : source) as number[]
    if (series.length <= order) {
      series = [0]
    } else {
      for (let round = 0; round < order; round++) {
        for (let index = 0; index < series.length - 1; index++) {
          series[index] = Number(series[index + 1] ?? 0) * ratio.re * (index + 1)
        }
        series.length--
      }
    }
    return named === 'poly' ? series : convert(series, 'poly', named)
  }
  let current = (named === 'poly' ? Internal.nested(source) : source) as Types.NumerixComplex[]
  if (current.length <= order) {
    current = [{ re: 0, im: 0 }]
  } else {
    for (let round = 0; round < order; round++) {
      for (let index = 0; index < current.length - 1; index++) {
        const entry = current[index + 1]!
        const target = current[index]!
        const reals = (entry.re * ratio.re - entry.im * ratio.im) * (index + 1)
        const imags = (entry.re * ratio.im + entry.im * ratio.re) * (index + 1)
        target.re = reals === 0 ? 0 : reals
        target.im = imags === 0 ? 0 : imags
      }
      current.length--
    }
  }
  return (named === 'poly' ? current : convert(current as unknown as number[], 'poly', named)) as
    | number[]
    | Types.NumerixComplex[]
}
