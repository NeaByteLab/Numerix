import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Interpolate values at query points.
 * @description Performs piecewise linear interpolation between known points.
 * @param query - Positions where values are requested
 * @param points - Sorted sample positions of the known values
 * @param values - Sample values paired with the positions
 * @param lower - Value returned for queries below the range
 * @param right - Value returned for queries above the range
 * @param period - Optional period for cyclic interpolation
 * @returns Interpolated values at the query positions
 */
export default function interp(
  query: number | number[] | number[][],
  points: number[],
  values: number[] | Types.NumerixComplex[],
  lower?: number | Types.NumerixComplex,
  right?: number | Types.NumerixComplex,
  period?: number
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (Array.isArray(query) && Array.isArray(query[0])) {
    return (query as number[][]).map((slice) =>
      interp(slice ?? [], points, values, lower, right, period) as
        | number[]
        | Types.NumerixComplex[]
    ) as number[][] | Types.NumerixComplex[][]
  }
  if (
    Internal.shape(lower) ||
    Internal.shape(right) ||
    Internal.classify(values, true, true) === true
  ) {
    const reals = new Array<number>(values.length)
    const imags = new Array<number>(values.length)
    for (let index = 0; index < values.length; index++) {
      const entry = values[index]
      reals[index] = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
      imags[index] = Internal.shape(entry) ? entry.im : 0
    }
    const alpha = interp(
      query,
      points,
      reals,
      lower !== undefined ? (Internal.shape(lower) ? lower.re : Number(lower)) : undefined,
      right !== undefined ? (Internal.shape(right) ? right.re : Number(right)) : undefined,
      period
    )
    const omega = interp(
      query,
      points,
      imags,
      lower !== undefined ? (Internal.shape(lower) ? lower.im : 0) : undefined,
      right !== undefined ? (Internal.shape(right) ? right.im : 0) : undefined,
      period
    )
    if (typeof alpha === 'number' && typeof omega === 'number') {
      return Number.isNaN(query as number) ? { re: NaN, im: 0 } : { re: alpha, im: omega }
    }
    return (alpha as number[]).map((entry, index) =>
      Number.isNaN((query as number[])[index]) ? { re: NaN, im: 0 } : {
        re: entry,
        im: (omega as number[])[index] ?? 0
      }
    )
  }
  const items = values as number[]
  const count = points.length
  if (items.length !== count) {
    throw new RangeError('fp and xp are not of the same length')
  }
  if (period !== undefined && (period === 0 || Number.isNaN(period))) {
    throw new RangeError('period must be a non-zero value')
  }
  if (Array.isArray(query) && query.length === 0) {
    return []
  }
  if (count === 0) {
    throw new RangeError('array of sample points is empty')
  }
  const cycle = period !== undefined ? Math.abs(period) : 0
  let positions = points
  let samples = items
  if (cycle > 0) {
    const order = Internal.indices(
      Array.from(
        { length: count },
        (_outer, index) => (((points[index] ?? 0) % cycle) + cycle) % cycle
      )
    )
    positions = new Array<number>(count + 2)
    samples = new Array<number>(count + 2)
    for (let index = 0; index < count; index++) {
      const source = order[index] ?? 0
      positions[index + 1] = (((points[source] ?? 0) % cycle) + cycle) % cycle
      samples[index + 1] = items[source] ?? 0
    }
    positions[0] = (positions[count] ?? 0) - cycle
    positions[count + 1] = (positions[1] ?? 0) + cycle
    samples[0] = samples[count] ?? 0
    samples[count + 1] = samples[1] ?? 0
  } else {
    for (let index = 1; index < count; index++) {
      if ((points[index] ?? 0) < (points[index - 1] ?? 0)) {
        throw new RangeError('sample points must be increasing')
      }
    }
  }
  const first = positions[0] ?? 0
  const limit = positions.length - 1
  const bound = positions[limit] ?? first
  const start = (cycle > 0 ? undefined : (lower as number | undefined)) ?? (samples[0] ?? 0)
  const finish = (cycle > 0 ? undefined : (right as number | undefined)) ??
    (samples[samples.length - 1] ?? start)
  return Internal.unary(query as number | number[], (point) => {
    const value = cycle > 0 ? (((point % cycle) + cycle) % cycle) : point
    if (Number.isNaN(value)) {
      return NaN
    }
    if (value < first) {
      return start
    }
    if (value > bound) {
      return finish
    }
    let below = 0
    let above = positions.length
    while (below < above) {
      const middle = (below + above) >> 1
      if ((positions[middle] ?? 0) <= value) {
        below = middle + 1
      } else {
        above = middle
      }
    }
    const index = Math.max(0, Math.min(limit - 1, below - 1))
    const upper = Math.min(limit, index + 1)
    const begin = positions[index] ?? 0
    const ceiling = positions[upper] ?? begin
    const initial = samples[index] ?? 0
    const final = samples[upper] ?? initial
    if (value === ceiling) {
      return final
    }
    if (value === begin || ceiling === begin || initial === final) {
      return initial
    }
    const slope = (final - initial) / (ceiling - begin)
    const result = initial + slope * (value - begin)
    if (Number.isNaN(result)) {
      const fallback = final + slope * (value - ceiling)
      return Number.isNaN(fallback) && slope === 0 ? initial : fallback
    }
    return result
  })
}
