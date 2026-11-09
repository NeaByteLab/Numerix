import type * as Types from '@app/types.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Compute a histogram of values.
 * @description Counts values falling into each bin.
 * @param values - Values to distribute across the bins
 * @param count - Number of bins or explicit bin edges
 * @param bounds - Value range covered by the bins or density flag
 * @param density - Density flag or optional sample weights
 * @param final - When true, normalizes weighted counts to density
 * @returns Bin counts with edges or a two-dimensional grid
 */
export default function histogram(
  values: number[] | number[][],
  count: number | number[] = 10,
  bounds?: [number, number] | number | boolean | number[] | number[][],
  density?: boolean | number[] | number[][],
  final = false
): Types.NumerixHistogram | Types.NumerixGrid {
  const samples = Array.isArray(values[0]) ? Shape.flatten<number>(values) : (values as number[])
  const normalized = typeof bounds === 'boolean'
    ? bounds
    : typeof density === 'boolean'
    ? density || final
    : final
  const supplied = Array.isArray(density) ? density : Array.isArray(bounds) &&
      (
        Array.isArray(count) ||
        bounds.length !== 2 ||
        Array.isArray(bounds[0]) ||
        typeof density === 'boolean'
      )
    ? bounds
    : undefined
  const weights = supplied
    ? (Array.isArray(supplied[0]) ? Shape.flatten<number>(supplied) : (supplied as number[]))
    : undefined
  if (weights !== undefined && weights.length !== samples.length) {
    throw new RangeError('weights should have the same shape as a.')
  }
  if (Array.isArray(count) && typeof bounds === 'number') {
    if (samples.length !== count.length) {
      throw new RangeError('x and y must have the same length.')
    }
    const horizontals = (histogram(samples, bounds) as Types.NumerixHistogram).edges
    const verticals = (histogram(count, bounds) as Types.NumerixHistogram).edges
    const limit = horizontals[bounds] ?? 1
    const ceiling = verticals[bounds] ?? 1
    const counts = Array.from({ length: bounds }, () => new Array<number>(bounds).fill(0))
    let total = 0
    for (let index = 0; index < samples.length; index++) {
      const across = samples[index] ?? 0
      const downward = count[index] ?? 0
      if (
        across >= (horizontals[0] ?? 0) &&
        across <= limit &&
        downward >= (verticals[0] ?? 0) &&
        downward <= ceiling
      ) {
        let lower = 0
        let upper = verticals.length
        if (downward === ceiling) {
          lower = bounds
        } else {
          while (lower < upper) {
            const middle = (lower + upper) >> 1
            if (downward < (verticals[middle] ?? 0)) {
              upper = middle
            } else {
              lower = middle + 1
            }
          }
        }
        const depth = lower - 1
        lower = 0
        upper = horizontals.length
        if (across === limit) {
          lower = bounds
        } else {
          while (lower < upper) {
            const middle = (lower + upper) >> 1
            if (across < (horizontals[middle] ?? 0)) {
              upper = middle
            } else {
              lower = middle + 1
            }
          }
        }
        const place = lower - 1
        const weight = weights ? (weights[index] ?? 0) : 1
        counts[place]![depth] = (counts[place]![depth] ?? 0) + weight
        total += weight
      }
    }
    return {
      counts: normalized
        ? counts.map((slice, across) => {
          const width = ((horizontals[across + 1] ?? 0) - (horizontals[across] ?? 0)) * total
          return slice.map(
            (entry, downward) =>
              entry / (width * ((verticals[downward + 1] ?? 0) - (verticals[downward] ?? 0)))
          )
        })
        : counts,
      xEdges: horizontals,
      yEdges: verticals
    }
  }
  let edges: number[]
  if (Array.isArray(count)) {
    edges = count
    if (edges.length < 1) {
      throw new RangeError('`bins` must increase monotonically, when an array')
    }
    for (let index = 0; index < edges.length; index++) {
      const entry = edges[index] ?? 0
      if (Number.isNaN(entry) || (index > 0 && entry < (edges[index - 1] ?? 0))) {
        throw new RangeError('`bins` must increase monotonically, when an array')
      }
    }
  } else {
    if (!Number.isInteger(count) || count < 1) {
      throw new RangeError('`bins` must be positive, when an integer')
    }
    const limits = (!supplied || Array.isArray(density)) && Array.isArray(bounds) &&
        !Array.isArray(bounds[0]) && bounds.length === 2
      ? (bounds as [number, number])
      : undefined
    let lower = limits ? limits[0] : Infinity
    let upper = limits ? limits[1] : -Infinity
    if (limits) {
      if (!Number.isFinite(lower) || !Number.isFinite(upper)) {
        throw new RangeError('range parameter must be finite.')
      }
      if (lower > upper) {
        throw new RangeError('max must be larger than min in range parameter.')
      }
    } else {
      for (let index = 0; index < samples.length; index++) {
        const sample = samples[index] ?? 0
        if (!Number.isFinite(sample)) {
          throw new RangeError('autodetected range of [nan, nan] is not finite')
        }
        if (sample < lower) {
          lower = sample
        }
        if (sample > upper) {
          upper = sample
        }
      }
      if (!Number.isFinite(lower)) {
        lower = 0
        upper = 1
      }
    }
    if (lower === upper) {
      lower -= 0.5
      upper += 0.5
    }
    edges = Array.from(
      { length: count + 1 },
      (_outer, index) => (index === count ? upper : lower + index * ((upper - lower) / count))
    )
  }
  const slots = Math.max(0, edges.length - 1)
  const counts = new Array<number>(slots).fill(0)
  let total = 0
  if (slots > 0) {
    const minimum = edges[0] ?? 0
    const maximum = edges[slots] ?? minimum
    for (let index = 0; index < samples.length; index++) {
      const value = samples[index] ?? 0
      if (value >= minimum && value <= maximum) {
        let lower = 0
        let upper = edges.length
        if (value === maximum) {
          lower = slots
        } else {
          while (lower < upper) {
            const middle = (lower + upper) >> 1
            if (value < (edges[middle] ?? 0)) {
              upper = middle
            } else {
              lower = middle + 1
            }
          }
        }
        const place = lower - 1
        const weight = weights ? (weights[index] ?? 0) : 1
        counts[place] = (counts[place] ?? 0) + weight
        total += weight
      }
    }
  }
  if (!normalized) {
    return { counts, edges }
  }
  return {
    counts: counts.map(
      (entry, index) => (entry ?? 0) / ((edges[index + 1] ?? 0) - (edges[index] ?? 0)) / total
    ),
    edges
  }
}
