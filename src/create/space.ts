import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Maths from '@app/math/index.ts'

/**
 * Build evenly spaced values.
 * @description Generates linear, logarithmic, or geometric spacing.
 * @param start - First value or vector of values of the sequence
 * @param finish - Last value or vector of values of the sequence
 * @param count - Number of values to generate
 * @param method - Spacing mode applied to the sequence
 * @param endpoint - When true, includes the stop value
 * @param radix - Logarithm base for logarithmic spacing
 * @returns Array or matrix of generated values
 */
export default function space(
  start: number,
  finish: number,
  count?: number,
  method?: 'linear' | 'log' | 'geom' | boolean,
  endpoint?: boolean | 'linear' | 'log' | 'geom',
  radix?: number
): number[]
/**
 * Build evenly spaced complex values.
 * @description Generates linear, logarithmic, or geometric spacing for complex bounds.
 * @param start - First complex or real value
 * @param finish - Last complex or real value
 * @param count - Number of values to generate
 * @param method - Spacing mode applied to the sequence
 * @param endpoint - When true, includes the stop value
 * @param radix - Logarithm base for logarithmic spacing
 * @returns Array of generated complex values
 */
export default function space(
  start: number | Types.NumerixComplex,
  finish: number | Types.NumerixComplex,
  count?: number,
  method?: 'linear' | 'log' | 'geom' | boolean,
  endpoint?: boolean | 'linear' | 'log' | 'geom',
  radix?: number | Types.NumerixComplex
): number[] | Types.NumerixComplex[]
/**
 * Build values from vector bounds.
 * @description Generates two-dimensional linear, logarithmic, or geometric spacing.
 * @param start - First value or vector of values
 * @param finish - Last value or vector of values
 * @param count - Number of values to generate
 * @param method - Spacing mode applied to the sequence
 * @param endpoint - When true, includes the stop value
 * @param radix - Logarithm base for logarithmic spacing
 * @returns Matrix of generated values
 */
export default function space(
  start:
    | number
    | number[]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | (number | Types.NumerixComplex)[],
  finish:
    | number
    | number[]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | (number | Types.NumerixComplex)[],
  count?: number,
  method?: 'linear' | 'log' | 'geom' | boolean,
  endpoint?: boolean | 'linear' | 'log' | 'geom',
  radix?: number | Types.NumerixComplex
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][]
/**
 * Build evenly spaced values.
 * @description Generates linear, logarithmic, or geometric spacing.
 * @param start - First value or vector of values
 * @param finish - Last value or vector of values
 * @param count - Number of values to generate
 * @param method - Spacing mode applied to the sequence
 * @param endpoint - When true, includes the stop value
 * @param radix - Logarithm base for logarithmic spacing
 * @returns Array or matrix of generated values
 */
export default function space(
  start:
    | number
    | number[]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | (number | Types.NumerixComplex)[],
  finish:
    | number
    | number[]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | (number | Types.NumerixComplex)[],
  count = 50,
  method?: 'linear' | 'log' | 'geom' | boolean,
  endpoint?: boolean | 'linear' | 'log' | 'geom',
  radix: number | Types.NumerixComplex = 10
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (
    (typeof method === 'string' && method !== 'linear' && method !== 'log' && method !== 'geom') ||
    (typeof endpoint === 'string' && endpoint !== 'linear' && endpoint !== 'log' &&
      endpoint !== 'geom')
  ) {
    throw new RangeError("mode must be one of 'linear', 'log', or 'geom'")
  }
  if (count < 0) {
    throw new RangeError('Number of samples must be non-negative')
  }
  if (Array.isArray(start) || Array.isArray(finish)) {
    const starts = Array.isArray(start) ? start : [start]
    const stops = Array.isArray(finish) ? finish : [finish]
    if (starts.length !== stops.length && starts.length !== 1 && stops.length !== 1) {
      throw new RangeError('operands could not be broadcast together')
    }
    let complex = Internal.shape(radix)
    if (!complex) {
      for (let index = 0; index < starts.length; index++) {
        if (Internal.shape(starts[index])) {
          complex = true
          break
        }
      }
    }
    if (!complex) {
      for (let index = 0; index < stops.length; index++) {
        if (Internal.shape(stops[index])) {
          complex = true
          break
        }
      }
    }
    const width = starts.length === 1 ? stops.length : starts.length
    if (width === 0) {
      if (method === 'geom' || endpoint === 'geom') {
        for (let index = 0; index < starts.length; index++) {
          const entry = starts[index]
          if (Internal.shape(entry) ? entry.re === 0 && entry.im === 0 : Number(entry ?? 0) === 0) {
            throw new RangeError('Geometric sequence cannot include zero')
          }
        }
        for (let index = 0; index < stops.length; index++) {
          const entry = stops[index]
          if (Internal.shape(entry) ? entry.re === 0 && entry.im === 0 : Number(entry ?? 0) === 0) {
            throw new RangeError('Geometric sequence cannot include zero')
          }
        }
      }
      return Array.from({ length: count }, () => [])
    }
    const columns = Array.from(
      { length: width },
      (_outer, column) => {
        const lower = starts[starts.length === 1 ? 0 : column] ?? 0
        const upper = stops[stops.length === 1 ? 0 : column] ?? 0
        return space(
          complex ? (Internal.shape(lower) ? lower : { re: Number(lower), im: 0 }) : lower,
          complex ? (Internal.shape(upper) ? upper : { re: Number(upper), im: 0 }) : upper,
          count,
          method,
          endpoint,
          radix
        ) as (number | Types.NumerixComplex)[]
      }
    )
    return Array.from(
      { length: count },
      (_outer, outer) => Array.from({ length: width }, (_inner, column) => columns[column]![outer]!)
    ) as number[][] | Types.NumerixComplex[][]
  }
  const spacing = typeof method === 'string'
    ? method
    : typeof endpoint === 'string'
    ? endpoint
    : 'linear'
  const closed = typeof method === 'boolean'
    ? method
    : typeof endpoint === 'boolean'
    ? endpoint
    : true
  const origin = Internal.components(start as number)
  const limit = Internal.components(finish as number)
  if (
    spacing === 'geom' &&
    ((origin.re === 0 && origin.im === 0) || (limit.re === 0 && limit.im === 0))
  ) {
    throw new RangeError('Geometric sequence cannot include zero')
  }
  if (count === 0) {
    return []
  }
  const complex = Internal.shape(start) ||
    Internal.shape(finish) ||
    (spacing === 'log' && Internal.shape(radix))
  if (count === 1) {
    return [
      spacing === 'log'
        ? (complex
          ? (Maths.pow(radix, { re: origin.re, im: origin.im }) as Types.NumerixComplex)
          : Math.pow(radix as number, origin.re))
        : (complex ? { re: origin.re, im: origin.im } : origin.re)
    ] as number[] | Types.NumerixComplex[]
  }
  const divisor = closed ? count - 1 : count
  if (spacing === 'geom') {
    if (complex) {
      const length = Math.hypot(origin.re, origin.im)
      const cosine = origin.re / length
      const sines = origin.im / length
      const imags = (limit.im * cosine) + (-limit.re * sines)
      const items = (Maths.exp(
        space(
          Maths.log({ re: length, im: 0 }) as Types.NumerixComplex,
          Maths.log({
            re: limit.re * cosine + limit.im * sines,
            im: imags === 0 ? (cosine < 0 || sines < 0 ? -0 : 0) : imags
          }) as Types.NumerixComplex,
          count,
          'linear',
          closed
        ) as Types.NumerixComplex[]
      ) as Types.NumerixComplex[]).map((entry) => ({
        re: entry.re * cosine - entry.im * sines,
        im: entry.re * sines + entry.im * cosine
      }))
      items[0] = { re: origin.re, im: origin.im }
      if (count > 1 && closed) {
        items[count - 1] = { re: limit.re, im: limit.im }
      }
      for (let index = 0; index < count; index++) {
        const entry = items[index]!
        const radius = Math.hypot(entry.re, entry.im)
        if (Math.abs(entry.re) <= radius * 1e-15) {
          entry.re = 0
        }
        if (Math.abs(entry.im) <= radius * 1e-15) {
          entry.im = 0
        }
      }
      return items
    }
    const polarity = origin.re < 0 ? -1 : 1
    const mismatched = polarity !== (limit.re < 0 ? -1 : 1)
    const lower = Math.log10(Math.abs(origin.re))
    const delta = (Math.log10(Math.abs(limit.re)) - lower) / divisor
    return Array.from(
      { length: count },
      (_outer, index) =>
        index === 0
          ? origin.re
          : index === count - 1 && closed
          ? limit.re
          : mismatched
          ? NaN
          : polarity * Math.pow(10, lower + index * delta)
    )
  }
  const first = (limit.re - origin.re) / divisor
  const second = (limit.im - origin.im) / divisor
  const pairs = Array.from(
    { length: count },
    (_outer, index) => {
      const reals = index === count - 1 && closed ? limit.re : origin.re + index * first
      return complex
        ? { re: reals, im: index === count - 1 && closed ? limit.im : origin.im + index * second }
        : reals
    }
  )
  return (
    spacing === 'log'
      ? (complex
        ? Maths.pow(radix, pairs as Types.NumerixComplex[])
        : (pairs as number[]).map((value) => Math.pow(radix as number, value)))
      : pairs
  ) as number[] | Types.NumerixComplex[]
}
