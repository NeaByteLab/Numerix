import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/** Polynomial domain endpoints tuple */
type DomainInterval = [number | Types.NumerixComplex, number | Types.NumerixComplex]
/** Polynomial domain operation mode */
type DomainMode = 'bounds' | 'map' | 'parms' | 'trim'

/**
 * Compute a polynomial domain.
 * @description Reports bounds, maps values, or trims trailing zeros.
 * @param values - Coefficients describing the domain
 * @param source - Source interval or mode
 * @param target - Target interval, mode, or tolerance
 * @param method - Domain operation applied to the values
 * @param tolerance - Threshold used when trimming
 * @returns Domain bounds or mapped values
 */
export default function domain(
  values:
    | (Types.NumerixComplex | number)[]
    | (Types.NumerixComplex | number)[][],
  source?: DomainInterval | DomainMode | number,
  target?: DomainInterval | DomainMode | number,
  method: DomainMode = 'bounds',
  tolerance = 0
):
  | [number, number]
  | [Types.NumerixComplex, Types.NumerixComplex]
  | number[]
  | number[][]
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  const resolved = typeof source === 'string'
    ? source
    : typeof target === 'string'
    ? target
    : source && !target && method === 'bounds' && !Array.isArray(values[0]) && values.length === 2
    ? 'parms'
    : method
  if (
    resolved !== 'bounds' &&
    resolved !== 'map' &&
    resolved !== 'parms' &&
    resolved !== 'trim'
  ) {
    throw new RangeError("mode must be one of 'bounds', 'map', 'parms', or 'trim'")
  }
  const cutoff = typeof source === 'number'
    ? source
    : typeof target === 'number'
    ? target
    : tolerance
  if (resolved === 'trim') {
    if (cutoff < 0 || Number.isNaN(cutoff)) {
      throw new RangeError('tolerance must be non-negative')
    }
    if (Array.isArray(values[0])) {
      throw new RangeError('Coefficient array is not 1-d')
    }
    const series = values as (number | Types.NumerixComplex)[]
    if (series.length === 0) {
      throw new RangeError('Coefficient array is empty')
    }
    let finish = series.length
    while (finish > 1) {
      const entry = series[finish - 1]
      if (
        (Internal.shape(entry) ? Math.hypot(entry.re, entry.im) : Math.abs(Number(entry ?? 0))) <=
          cutoff
      ) {
        finish--
      } else {
        break
      }
    }
    const complex = Internal.classify(series, true, true) === true
    if (
      finish === 1 &&
      (Internal.shape(series[0])
          ? Math.hypot(series[0].re, series[0].im)
          : Math.abs(Number(series[0] ?? 0))) <= cutoff
    ) {
      return complex ? [{ re: 0, im: 0 }] : [0]
    }
    return (complex ? Internal.nested(series.slice(0, finish)) : series.slice(0, finish)) as
      | number[]
      | Types.NumerixComplex[]
  }
  const origin = Array.isArray(source) ? source : undefined
  const destination = Array.isArray(target) ? target : undefined
  if (resolved === 'map' && (!origin || !destination)) {
    throw new RangeError(`${resolved} requires a source interval and a target interval`)
  }
  const shifted = resolved === 'parms' && origin && !destination &&
    !Array.isArray(values[0]) && values.length === 2
  const start = shifted ? (values as DomainInterval) : origin
  const finish = shifted ? origin : destination
  if (!start || !finish) {
    if (values.length === 0) {
      throw new RangeError('cannot compute domain of an empty array')
    }
    if (Array.isArray(values[0])) {
      throw new RangeError('Coefficient array is not 1-d')
    }
    const series = values as (number | Types.NumerixComplex)[]
    let lower = Infinity
    let upper = -Infinity
    let floor = Infinity
    let limit = -Infinity
    let complex = false
    for (let index = 0; index < series.length; index++) {
      const entry = series[index]
      const shaped = Internal.shape(entry)
      if (shaped) {
        complex = true
      }
      const reals = shaped ? entry.re : Number(entry ?? 0)
      const imags = shaped ? entry.im : 0
      if (Number.isNaN(reals)) {
        lower = NaN
        upper = NaN
      } else {
        if (reals < lower) {
          lower = reals
        }
        if (reals > upper) {
          upper = reals
        }
      }
      if (Number.isNaN(imags)) {
        floor = NaN
        limit = NaN
      } else {
        if (imags < floor) {
          floor = imags
        }
        if (imags > limit) {
          limit = imags
        }
      }
    }
    return complex
      ? [
        { re: lower === 0 ? 0 : lower, im: floor === 0 ? 0 : floor },
        { re: upper === 0 ? 0 : upper, im: limit === 0 ? 0 : limit }
      ]
      : [lower, upper]
  }
  if (start.length < 2 || finish.length < 2) {
    throw new RangeError('domain intervals must have at least 2 elements')
  }
  const first = Internal.components(start[0] as number)
  const right = Internal.components(start[1] as number)
  const lower = Internal.components(finish[0] as number)
  const upper = Internal.components(finish[1] as number)
  const width = right.re - first.re
  const depth = right.im - first.im
  const crest = Math.max(Math.abs(width), Math.abs(depth))
  if (crest === 0) {
    throw new RangeError('source domain endpoints cannot be equal')
  }
  const complex = Internal.shape(start[0]) ||
    Internal.shape(start[1]) ||
    Internal.shape(finish[0]) ||
    Internal.shape(finish[1]) ||
    (resolved !== 'parms' && Internal.classify(values, true, true) === true)
  const cosine = width / crest
  const sines = depth / crest
  const denom = crest * (cosine * cosine + sines * sines)
  const range = upper.re - lower.re
  const extra = upper.im - lower.im
  const scale = (range * cosine + extra * sines) / denom
  const angle = (extra * cosine - range * sines) / denom
  const alpha = (lower.re * right.re - lower.im * right.im) -
    (upper.re * first.re - upper.im * first.im)
  const omega = (lower.re * right.im + lower.im * right.re) -
    (upper.re * first.im + upper.im * first.re)
  const shift = (alpha * cosine + omega * sines) / denom
  const phase = (omega * cosine - alpha * sines) / denom
  if (resolved === 'parms') {
    return complex
      ? [
        { re: shift === 0 ? 0 : shift, im: phase === 0 ? 0 : phase },
        { re: scale === 0 ? 0 : scale, im: angle === 0 ? 0 : angle }
      ]
      : [shift, scale]
  }
  if (!complex) {
    return Internal.traverse(values, (entry) => shift + scale * Number(entry ?? 0), false) as
      | number[]
      | number[][]
  }
  return Internal.traverse(values, (entry) => {
    const first = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const right = Internal.shape(entry) ? entry.im : 0
    const reals = shift + (scale * first - angle * right)
    const imags = phase + (scale * right + angle * first)
    return { re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags }
  }, true) as Types.NumerixComplex[] | Types.NumerixComplex[][]
}
