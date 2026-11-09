import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Build a Vandermonde matrix.
 * @description Places powers of each sample into a matrix.
 * @param samples - Sample points used as matrix rows
 * @param degree - Highest power included in each row
 * @param basis - Polynomial basis of the generated rows
 * @returns Vandermonde matrix of the sample points
 */
export default function vander(
  samples: number[],
  degree: number,
  basis?: Types.NumerixBasis
): number[][]
/**
 * Build a complex Vandermonde matrix.
 * @description Places powers of each complex sample into a matrix.
 * @param samples - Complex sample points used as matrix rows
 * @param degree - Highest power included in each row
 * @param basis - Polynomial basis of the generated rows
 * @returns Complex Vandermonde matrix of the sample points
 */
export default function vander(
  samples: Types.NumerixComplex[],
  degree: number,
  basis?: Types.NumerixBasis
): Types.NumerixComplex[][]
/**
 * Build a Vandermonde matrix.
 * @description Places powers of each sample into a matrix.
 * @param samples - Sample points used as matrix rows
 * @param degree - Highest power included in each row
 * @param basis - Polynomial basis of the generated rows
 * @returns Vandermonde matrix of the sample points
 */
export default function vander(
  samples: number[] | Types.NumerixComplex[],
  degree: number,
  basis?: Types.NumerixBasis
): number[][] | Types.NumerixComplex[][]
/**
 * Build a three-dimensional Vandermonde tensor.
 * @description Places powers of each matrix sample into rows.
 * @param samples - Matrix of sample points
 * @param degree - Highest power included in each row
 * @param basis - Polynomial basis of the generated rows
 * @returns Three-dimensional Vandermonde array of the sample matrix
 */
export default function vander(
  samples: number[][],
  degree: number,
  basis?: Types.NumerixBasis
): number[][][]
/**
 * Build a two-dimensional Vandermonde matrix.
 * @description Places basis powers of both sample axes.
 * @param samples - First-axis sample points
 * @param degree - Second-axis sample points
 * @param basis - Degree pair along both axes for a two-dimensional Vandermonde matrix
 * @param surface - Polynomial basis for the two-dimensional Vandermonde matrix
 * @returns Two-dimensional Vandermonde matrix of the sample points
 */
export default function vander(
  samples: number[],
  degree: number[],
  basis: [number, number] | number[],
  surface?: Types.NumerixBasis
): number[][]
/**
 * Build a Vandermonde matrix.
 * @description Places powers of each sample into a matrix.
 * @param samples - Sample points used as matrix rows
 * @param degree - Highest power included in each row, or second-axis sample points for a two-dimensional Vandermonde matrix
 * @param basis - Polynomial basis of the generated rows, or degree pair for a two-dimensional Vandermonde matrix
 * @param surface - Polynomial basis for the two-dimensional Vandermonde matrix
 * @returns Vandermonde matrix of the sample points
 */
export default function vander(
  samples: (number | Types.NumerixComplex)[] | (number | Types.NumerixComplex)[][],
  degree: number | (number | Types.NumerixComplex)[],
  basis: Types.NumerixBasis | [number, number] | number[] = 'poly',
  surface: Types.NumerixBasis = 'poly'
): number[][] | number[][][] | Types.NumerixComplex[][] | Types.NumerixComplex[][][] {
  const complex = Internal.classify(samples, true, true) === true ||
    (Array.isArray(degree) && Internal.classify(degree, true, true) === true)
  if (Array.isArray(degree)) {
    if (
      surface !== 'poly' &&
      surface !== 'cheb' &&
      surface !== 'leg' &&
      surface !== 'herm' &&
      surface !== 'herme' &&
      surface !== 'lag'
    ) {
      throw new RangeError("basis must be one of 'poly', 'cheb', 'leg', 'herm', 'herme', or 'lag'")
    }
    const points = samples as (number | Types.NumerixComplex)[]
    if (points.length !== degree.length) {
      throw new RangeError('x and y must have the same length')
    }
    const horizontal = Array.isArray(basis) ? (basis[0] ?? 0) : 0
    const vertical = Array.isArray(basis) ? (basis[1] ?? 0) : 0
    if (
      !Number.isInteger(horizontal) || horizontal < 0 || !Number.isInteger(vertical) ||
      vertical < 0
    ) {
      throw new RangeError('deg must be non-negative')
    }
    const abscissa = vander(points as number[], horizontal, surface) as (
      | number
      | Types.NumerixComplex
    )[][]
    const ordinate = vander(degree as number[], vertical, surface) as (
      | number
      | Types.NumerixComplex
    )[][]
    const height = vertical + 1
    const width = (horizontal + 1) * height
    if (!complex) {
      return Array.from(
        { length: points.length },
        (_outer, index) => {
          const leading = abscissa[index] as number[] | undefined
          const trailing = ordinate[index] as number[] | undefined
          return Array.from({ length: width }, (_inner, entry) => {
            const offset = entry % height
            return (leading?.[(entry - offset) / height] ?? 0) * (trailing?.[offset] ?? 0)
          })
        }
      )
    }
    return Array.from(
      { length: points.length },
      (_outer, index) => {
        const leading = abscissa[index]
        const trailing = ordinate[index]
        return Array.from({ length: width }, (_inner, entry) => {
          const offset = entry % height
          const first = leading?.[(entry - offset) / height]
          const right = trailing?.[offset]
          const alpha = Internal.shape(first) ? first.re : Number(first ?? 0)
          const gamma = Internal.shape(first) ? first.im : 0
          const omega = Internal.shape(right) ? right.re : Number(right ?? 0)
          const extra = Internal.shape(right) ? right.im : 0
          return {
            re: alpha * omega - gamma * extra,
            im: alpha * extra + gamma * omega
          }
        })
      }
    )
  }
  if (!Number.isInteger(degree) || degree < 0) {
    throw new RangeError('deg must be non-negative')
  }
  const named = (Array.isArray(basis) ? surface : basis) as Types.NumerixBasis
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
  if (Array.isArray(samples[0])) {
    return (
      complex
        ? Internal.nested((samples as number[][]).map((entry) => vander(entry, degree, named)))
        : (samples as number[][]).map((entry) => vander(entry, degree, named))
    ) as number[][][] | Types.NumerixComplex[][][]
  }
  return (samples as unknown[]).map((entry) => {
    const first = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const right = Internal.shape(entry) ? entry.im : 0
    if (!complex) {
      const values = new Array<number>(degree + 1)
      values[0] = 1
      if (degree > 0) {
        values[1] = named === 'herm' ? 2 * first : named === 'lag' ? 1 - first : first
        for (let order = 1; order < degree; order++) {
          const current = values[order] ?? 0
          const previous = values[order - 1] ?? 0
          const reals = first * current
          values[order + 1] = named === 'poly'
            ? reals
            : named === 'cheb'
            ? 2 * reals - previous
            : named === 'leg'
            ? ((2 * order + 1) * reals - order * previous) / (order + 1)
            : named === 'herm'
            ? 2 * reals - 2 * order * previous
            : named === 'herme'
            ? reals - order * previous
            : ((2 * order + 1 - first) * current - order * previous) / (order + 1)
        }
      }
      return values
    }
    const values = new Array<Types.NumerixComplex>(degree + 1)
    values[0] = { re: 1, im: 0 }
    if (degree > 0) {
      values[1] = named === 'herm'
        ? { re: 2 * first, im: 2 * right }
        : named === 'lag'
        ? { re: 1 - first, im: -right }
        : { re: first, im: right }
      for (let order = 1; order < degree; order++) {
        const current = values[order] ?? { re: 0, im: 0 }
        const previous = values[order - 1] ?? { re: 0, im: 0 }
        const reals = first * current.re - right * current.im
        const imags = first * current.im + right * current.re
        values[order + 1] = named === 'poly'
          ? { re: reals, im: imags }
          : named === 'cheb'
          ? { re: 2 * reals - previous.re, im: 2 * imags - previous.im }
          : named === 'leg'
          ? {
            re: ((2 * order + 1) * reals - order * previous.re) / (order + 1),
            im: ((2 * order + 1) * imags - order * previous.im) / (order + 1)
          }
          : named === 'herm'
          ? {
            re: 2 * reals - 2 * order * previous.re,
            im: 2 * imags - 2 * order * previous.im
          }
          : named === 'herme'
          ? { re: reals - order * previous.re, im: imags - order * previous.im }
          : {
            re: ((2 * order + 1 - first) * current.re + right * current.im -
              order * previous.re) / (order + 1),
            im: ((2 * order + 1 - first) * current.im - right * current.re -
              order * previous.im) / (order + 1)
          }
      }
    }
    return values
  }) as number[][] | Types.NumerixComplex[][]
}
