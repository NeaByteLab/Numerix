import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Maths from '@app/math/index.ts'
import mean from '@app/stat/mean.ts'

/**
 * Compute a weighted average.
 * @description Averages values using optional weights and axis.
 * @param values - Vector or matrix of values to average
 * @param weights - Optional weights applied to each value
 * @param level - Optional axis along which to average
 * @returns Weighted average of the given values
 */
export default function average(
  values: unknown[],
  weights?:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][]
    | number,
  level?:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][]
): number | number[] | Types.NumerixComplex | Types.NumerixComplex[] {
  const factors = Array.isArray(weights) ? weights : Array.isArray(level) ? level : undefined
  const chosen = typeof level === 'number'
    ? level
    : typeof weights === 'number'
    ? weights
    : undefined
  if (factors === undefined) {
    return mean(values, false, chosen)
  }
  const matrix = Array.isArray(values[0])
  if (!matrix && chosen !== undefined) {
    const resolved = chosen < 0 ? 1 + chosen : chosen
    if (resolved < 0 || resolved >= 1) {
      throw new RangeError('axis is out of bounds for array of dimension 1')
    }
  }
  if (matrix && chosen !== undefined) {
    const target = chosen < 0 ? 2 + chosen : chosen
    if (target < 0 || target >= 2) {
      throw new RangeError('axis is out of bounds for array of dimension 2')
    }
    const table = Array.isArray(factors[0]) ? (factors as unknown[][]) : undefined
    const slices = values as unknown[][]
    const height = slices.length
    const width = slices[0]?.length ?? 0
    if (
      table
        ? table.length !== height || (table[0]?.length ?? 0) !== width
        : factors.length !== (target === 0 ? height : width)
    ) {
      throw new RangeError(
        'Shape of weights must be consistent with shape of a along specified axis'
      )
    }
    if (target === 0) {
      if (width === 0 && !table) {
        average(new Array<unknown>(height).fill(0), factors)
        return []
      }
      const buffer = new Array<unknown>(height)
      const column = table ? new Array<unknown>(height) : undefined
      const result = Array.from(
        { length: width },
        (_unused, inner) =>
          average(
            Internal.column(slices, height, inner, buffer, 0),
            (table ? Internal.column(table, height, inner, column!, 0) : factors) as number[]
          )
      )
      return (
        Internal.classify(values, true, true) === true ||
          Internal.classify(factors, true, true) === true
          ? Internal.nested(result)
          : result
      ) as number[] | Types.NumerixComplex[]
    }
    const result = slices.map((slice, cursor) => {
      const weighting = (table ? (table[cursor] ?? []) : factors) as number[]
      if (weighting.length !== (slice ?? []).length) {
        throw new RangeError('1D weights expected when shapes of a and weights differ')
      }
      return average(slice ?? [], weighting)
    })
    return (
      Internal.classify(values, true, true) === true ||
        Internal.classify(factors, true, true) === true
        ? Internal.nested(result)
        : result
    ) as number[] | Types.NumerixComplex[]
  }
  if (
    matrix
      ? !Array.isArray(factors[0]) ||
        factors.length !== values.length ||
        ((factors[0] as unknown[] | undefined)?.length ?? 0) !==
          ((values[0] as unknown[] | undefined)?.length ?? 0)
      : Array.isArray(factors[0]) || factors.length !== values.length
  ) {
    throw new RangeError(
      chosen !== undefined
        ? 'Shape of weights must be consistent with shape of a along specified axis'
        : 'Axis must be specified when shapes of a and weights differ'
    )
  }
  if (
    Internal.classify(values, true, true) !== true &&
    Internal.classify(factors, true, true) !== true
  ) {
    let total = 0
    let reals = 0
    if (matrix) {
      for (let outer = 0; outer < values.length; outer++) {
        const slice = (values[outer] ?? []) as number[]
        const scale = (factors[outer] ?? []) as number[]
        for (let column = 0; column < slice.length; column++) {
          const weight = Number(scale[column] ?? 0)
          total += weight
          reals += Number(slice[column] ?? 0) * weight
        }
      }
    } else {
      for (let index = 0; index < values.length; index++) {
        const weight = Number((factors as number[])[index] ?? 0)
        total += weight
        reals += Number((values as number[])[index] ?? 0) * weight
      }
    }
    if (total === 0) {
      throw new RangeError("Weights sum to zero, can't be normalized")
    }
    return reals / total
  }
  let total = 0
  let tally = 0
  let reals = 0
  let imags = 0
  if (matrix) {
    for (let outer = 0; outer < values.length; outer++) {
      const slice = (values[outer] ?? []) as unknown[]
      const scale = (factors[outer] ?? []) as unknown[]
      for (let column = 0; column < slice.length; column++) {
        const entry = slice[column]
        const weight = scale[column]
        const point = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
        const phase = Internal.shape(entry) ? entry.im : 0
        const prior = Internal.shape(weight) ? weight.re : Number(weight ?? 0)
        const extra = Internal.shape(weight) ? weight.im : 0
        total += prior
        tally += extra
        reals += point * prior - phase * extra
        imags += point * extra + phase * prior
      }
    }
  } else {
    for (let index = 0; index < values.length; index++) {
      const entry = values[index]
      const weight = factors[index]
      const point = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
      const phase = Internal.shape(entry) ? entry.im : 0
      const prior = Internal.shape(weight) ? weight.re : Number(weight ?? 0)
      const extra = Internal.shape(weight) ? weight.im : 0
      total += prior
      tally += extra
      reals += point * prior - phase * extra
      imags += point * extra + phase * prior
    }
  }
  if (total === 0 && tally === 0) {
    throw new RangeError("Weights sum to zero, can't be normalized")
  }
  return Maths.div({ re: reals, im: imags }, { re: total, im: tally }) as Types.NumerixComplex
}
