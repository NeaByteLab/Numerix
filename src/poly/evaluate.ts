import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Evaluate a polynomial at sample points.
 * @description Computes polynomial values using Horner iteration.
 * @param sample - Point or points where the polynomial is evaluated
 * @param coefficients - Coefficients or roots of the source polynomial
 * @param basis - Polynomial basis, roots mode, boolean flag, or coefficient matrix
 * @param surface - Polynomial basis for two-dimensional evaluation or tensor flag
 * @returns Polynomial values at the sample points
 */
export default function evaluate(
  sample:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  coefficients:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  basis:
    | Types.NumerixBasis
    | 'roots'
    | boolean
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][] = 'poly',
  surface: Types.NumerixBasis | boolean = 'poly'
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  const complex = Internal.classify(sample, true, true) === true ||
    Internal.classify(coefficients, true, true) === true ||
    (Array.isArray(basis) && Internal.classify(basis, true, true) === true)
  if (
    (basis === 'roots' || basis === true) &&
    !(Array.isArray(coefficients) && Array.isArray(coefficients[0]))
  ) {
    const roots = Array.isArray(coefficients) ? coefficients : [coefficients]
    if (!complex) {
      return Internal.traverse(sample, (point) => {
        const scalar = Number(point ?? 0)
        let reals = 1
        for (let index = 0; index < roots.length; index++) {
          reals *= scalar - Number(roots[index] ?? 0)
        }
        return reals === 0 ? 0 : reals
      }, false) as number | number[] | number[][]
    }
    return Internal.traverse(sample, (point) => {
      const first = Internal.shape(point) ? point.re : Number(point ?? 0)
      const right = Internal.shape(point) ? point.im : 0
      let reals = 1
      let imags = 0
      for (let index = 0; index < roots.length; index++) {
        const entry = roots[index]
        const alpha = first - (Internal.shape(entry) ? entry.re : Number(entry ?? 0))
        const omega = right - (Internal.shape(entry) ? entry.im : 0)
        ;[reals, imags] = [reals * alpha - imags * omega, reals * omega + imags * alpha]
      }
      return { re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags }
    }, true) as
      | Types.NumerixComplex
      | Types.NumerixComplex[]
      | Types.NumerixComplex[][]
  }
  if (Array.isArray(basis)) {
    const named: Types.NumerixBasis = typeof surface === 'string' ? surface : 'poly'
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
    if (basis.length === 0) {
      throw new RangeError('Coefficient array is empty')
    }
    if (Array.isArray(basis[0])) {
      for (let index = 0; index < basis.length; index++) {
        if ((basis[index] as unknown[]).length === 0) {
          throw new RangeError('Coefficient array is empty')
        }
      }
    }
    if (Array.isArray(sample) !== Array.isArray(coefficients)) {
      throw new RangeError('x, y are incompatible')
    }
    const gridded = Array.isArray(sample) && Array.isArray(sample[0])
    if (gridded !== (Array.isArray(coefficients) && Array.isArray(coefficients[0]))) {
      throw new RangeError('x, y are incompatible')
    }
    const abscissa = (Array.isArray(sample) ? sample : [sample]) as unknown[]
    const ordinate = (Array.isArray(coefficients) ? coefficients : [coefficients]) as unknown[]
    if (abscissa.length !== ordinate.length) {
      throw new RangeError('x, y are incompatible')
    }
    if (!Array.isArray(basis[0]) && gridded) {
      for (let index = 0; index < abscissa.length; index++) {
        if (
          ((abscissa[index] as unknown[] | undefined)?.length ?? 0) !==
            ((ordinate[index] as unknown[] | undefined)?.length ?? 0)
        ) {
          throw new RangeError('x, y are incompatible')
        }
      }
    }
    if (!Array.isArray(basis[0])) {
      if (!Array.isArray(sample)) {
        return evaluate(
          coefficients as number,
          [evaluate(sample as number, basis as number[], named) as number],
          named
        )
      }
      if (gridded) {
        const evaluated = evaluate(sample as number[][], basis as number[], named) as number[][]
        const output = ordinate.map((slice) =>
          evaluate((slice ?? []) as number[], evaluated, named, false) as (
            | number
            | Types.NumerixComplex
          )[]
        )
        return complex
          ? (Internal.nested(output) as Types.NumerixComplex[][])
          : (output as number[][])
      }
      return evaluate(
        ordinate as number[],
        evaluate(abscissa as number[], basis as number[], named) as number[],
        named
      )
    }
    const matrix = basis as (number | Types.NumerixComplex)[][]
    if (!Array.isArray(sample)) {
      return evaluate(
        sample as number | Types.NumerixComplex,
        matrix.map((slice) =>
          evaluate(
            coefficients as number | Types.NumerixComplex,
            (slice ?? []) as Types.NumerixComplex[],
            named
          ) as number | Types.NumerixComplex
        ) as Types.NumerixComplex[],
        named
      ) as number | Types.NumerixComplex
    }
    const output = abscissa.map((entry, index) =>
      evaluate(
        (entry ?? (gridded ? [] : 0)) as number[],
        (ordinate[index] ?? (gridded ? [] : 0)) as number[],
        matrix,
        named
      )
    )
    return complex
      ? (Internal.nested(output) as Types.NumerixComplex[] | Types.NumerixComplex[][])
      : (output as number[] | number[][])
  }
  const named: Types.NumerixBasis = typeof basis === 'string' && basis !== 'roots' ? basis : 'poly'
  const chosen: Types.NumerixBasis | 'roots' = basis === 'roots' || basis === true ? 'roots' : named
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
  if (Array.isArray(coefficients) && coefficients.length === 0) {
    throw new RangeError('Coefficient array is empty')
  }
  if (Array.isArray(coefficients) && Array.isArray(coefficients[0])) {
    const matrix = coefficients as (number | Types.NumerixComplex)[][]
    const height = matrix.length
    const width = matrix[0]?.length ?? 0
    const buffer = new Array<number | Types.NumerixComplex>(height)
    let output: unknown[]
    if (Array.isArray(sample) && !(typeof surface === 'boolean' ? surface : true)) {
      const points = sample as (number | Types.NumerixComplex)[]
      if (Array.isArray(points[0])) {
        if (chosen === 'roots') {
          throw new RangeError('x.ndim must be < r.ndim when tensor == False')
        }
        return (sample as (number | Types.NumerixComplex)[][]).map((entry) =>
          evaluate(entry as number[], matrix as number[][], chosen, false)
        ) as unknown as number[] | Types.NumerixComplex[]
      }
      if (points.length !== 1 && width !== 1 && points.length !== width) {
        throw new RangeError('operands could not be broadcast together')
      }
      output = Array.from(
        { length: width === 1 ? points.length : width },
        (_outer, index) =>
          evaluate(
            points[points.length === 1 ? 0 : index] ?? 0,
            Internal.column(
              matrix,
              height,
              width === 1 ? 0 : index,
              buffer
            ) as Types.NumerixComplex[],
            chosen
          ) as number | Types.NumerixComplex
      )
    } else {
      output = Array.from(
        { length: width },
        (_outer, column) =>
          evaluate(
            sample as Types.NumerixComplex[],
            Internal.column(matrix, height, column, buffer) as Types.NumerixComplex[],
            chosen
          )
      )
    }
    return complex
      ? (Internal.nested(output) as Types.NumerixComplex[] | Types.NumerixComplex[][])
      : (output as number[] | number[][])
  }
  const items = (Array.isArray(coefficients) ? coefficients : [coefficients]) as (
    | number
    | Types.NumerixComplex
  )[]
  const count = items.length
  if (count === 0) {
    throw new RangeError('Coefficient array is empty')
  }
  if (named === 'poly') {
    if (!complex) {
      return Internal.traverse(sample, (point) => {
        const scalar = Number(point ?? 0)
        let reals = 0
        for (let power = count - 1; power >= 0; power--) {
          reals = reals * scalar + Number(items[power] ?? 0)
        }
        return reals
      }, false) as number | number[] | number[][]
    }
    return Internal.traverse(sample, (point) => {
      const first = Internal.shape(point) ? point.re : Number(point ?? 0)
      const right = Internal.shape(point) ? point.im : 0
      let reals = 0
      let imags = 0
      for (let power = count - 1; power >= 0; power--) {
        const entry = items[power]
        ;[reals, imags] = [
          reals * first - imags * right +
          (Internal.shape(entry) ? entry.re : Number(entry ?? 0)),
          reals * right + imags * first + (Internal.shape(entry) ? entry.im : 0)
        ]
      }
      return { re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags }
    }, true) as
      | Types.NumerixComplex
      | Types.NumerixComplex[]
      | Types.NumerixComplex[][]
  }
  if (!complex) {
    return Internal.traverse(sample, (point) => {
      const scalar = Number(point ?? 0)
      let prior = 1
      let reals = Number(items[0] ?? 0)
      if (count > 1) {
        let current = named === 'herm' ? 2 * scalar : named === 'lag' ? 1 - scalar : scalar
        reals += Number(items[1] ?? 0) * current
        for (let order = 1; order < count - 1; order++) {
          const product = scalar * current
          ;[prior, current] = [
            current,
            named === 'cheb'
              ? 2 * product - prior
              : named === 'leg'
              ? ((2 * order + 1) * product - order * prior) / (order + 1)
              : named === 'herm'
              ? 2 * product - 2 * order * prior
              : named === 'herme'
              ? product - order * prior
              : ((2 * order + 1 - scalar) * current - order * prior) / (order + 1)
          ]
          reals += Number(items[order + 1] ?? 0) * current
        }
      }
      return reals
    }, false) as number | number[] | number[][]
  }
  return Internal.traverse(sample, (point) => {
    const first = Internal.shape(point) ? point.re : Number(point ?? 0)
    const right = Internal.shape(point) ? point.im : 0
    const initial = items[0]
    let reals = Internal.shape(initial) ? initial.re : Number(initial ?? 0)
    let imags = Internal.shape(initial) ? initial.im : 0
    if (count > 1) {
      let prior = 1
      let phase = 0
      let current = named === 'herm' ? 2 * first : named === 'lag' ? 1 - first : first
      let shift = named === 'herm' ? 2 * right : named === 'lag' ? -right : right
      const linear = items[1]
      const alpha = Internal.shape(linear) ? linear.re : Number(linear ?? 0)
      const gamma = Internal.shape(linear) ? linear.im : 0
      reals += alpha * current - gamma * shift
      imags += alpha * shift + gamma * current
      for (let order = 1; order < count - 1; order++) {
        const omega = first * current - right * shift
        const extra = first * shift + right * current
        ;[prior, phase, current, shift] = [
          current,
          shift,
          named === 'cheb'
            ? 2 * omega - prior
            : named === 'leg'
            ? ((2 * order + 1) * omega - order * prior) / (order + 1)
            : named === 'herm'
            ? 2 * omega - 2 * order * prior
            : named === 'herme'
            ? omega - order * prior
            : ((2 * order + 1 - first) * current + right * shift - order * prior) / (order + 1),
          named === 'cheb'
            ? 2 * extra - phase
            : named === 'leg'
            ? ((2 * order + 1) * extra - order * phase) / (order + 1)
            : named === 'herm'
            ? 2 * extra - 2 * order * phase
            : named === 'herme'
            ? extra - order * phase
            : ((2 * order + 1 - first) * shift - right * current - order * phase) / (order + 1)
        ]
        const entry = items[order + 1]
        const coeff = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
        const angle = Internal.shape(entry) ? entry.im : 0
        reals += coeff * current - angle * shift
        imags += coeff * shift + angle * current
      }
    }
    return { re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags }
  }, true) as
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
}
