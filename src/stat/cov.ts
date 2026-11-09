import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the covariance of signals.
 * @description Measures how two signals vary together.
 * @param values - First signal used in the calculation
 * @param other - Second signal or degrees of freedom
 * @param freedom - Degrees of freedom or row-variable flag
 * @param layered - When true, treats each row as a variable, or specifies the bias flag
 * @param counts - Optional integer frequency weights
 * @param factors - Optional analytic observation weights
 * @returns Covariance matrix of the given signals
 */
export default function cov(
  values: (number | Types.NumerixComplex)[] | (number | Types.NumerixComplex)[][],
  other?: (number | Types.NumerixComplex)[] | (number | Types.NumerixComplex)[][] | number,
  freedom?: number | boolean,
  layered?: boolean | number,
  counts?: number[],
  factors?: number[]
): number[][] | Types.NumerixComplex[][] {
  const divisor = typeof other === 'number'
    ? other
    : typeof freedom === 'number'
    ? freedom
    : typeof layered === 'number'
    ? layered
    : layered === true
    ? 0
    : 1
  if (
    Array.isArray(other) &&
    !Array.isArray(values[0]) &&
    !Array.isArray(other[0]) &&
    (other as unknown[]).length !== values.length
  ) {
    throw new RangeError(
      'all the input array dimensions except for the concatenation axis must match exactly'
    )
  }
  const signals = Internal.signals(
    values as number[][],
    (Array.isArray(other) ? other : undefined) as number[][] | undefined,
    typeof freedom === 'boolean' ? freedom : typeof layered === 'boolean' ? layered : true
  )
  if (signals.length === 0) {
    return []
  }
  const samples = signals[0]?.length ?? 0
  if (counts !== undefined || factors !== undefined) {
    if (counts !== undefined && counts.length !== samples) {
      throw new RangeError('incompatible numbers of samples and fweights')
    }
    if (factors !== undefined && factors.length !== samples) {
      throw new RangeError('incompatible numbers of samples and aweights')
    }
    let total = 0
    let square = 0
    const weights = Float64Array.from({ length: samples }, (_outer, index) => {
      const count = counts ? (counts[index] ?? 0) : 1
      if (counts !== undefined && (!Number.isInteger(count) || count < 0)) {
        throw new RangeError('fweights must be non-negative integers')
      }
      const analytic = factors ? (factors[index] ?? 0) : 1
      if (factors !== undefined && analytic < 0) {
        throw new RangeError('aweights cannot be negative')
      }
      const combined = count * analytic
      total += combined
      square += combined * analytic
      return combined
    })
    if (total <= 0) {
      throw new RangeError("Weights sum to zero, can't be normalized")
    }
    const denom = divisor === 0 ? total : Math.max(0, total - divisor * (square / total))
    if (Internal.classify(signals, true, true) !== true) {
      const centered = signals.map((signal) => {
        let accum = 0
        for (let index = 0; index < samples; index++) {
          accum += Number((signal ?? [])[index] ?? 0) * (weights[index] ?? 0)
        }
        const average = accum / total
        return Float64Array.from(
          { length: samples },
          (_outer, index) => Number((signal ?? [])[index] ?? 0) - average
        )
      })
      const result = Array.from({ length: signals.length }, () => new Array<number>(signals.length))
      for (let cursor = 0; cursor < signals.length; cursor++) {
        const outer = centered[cursor]!
        for (let column = cursor; column < signals.length; column++) {
          const inner = centered[column]!
          let reals = 0
          for (let index = 0; index < samples; index++) {
            reals += (weights[index] ?? 0) * (outer[index] ?? 0) * (inner[index] ?? 0)
          }
          const entry = denom === 0 ? NaN : reals / denom
          result[cursor]![column] = entry
          result[column]![cursor] = entry
        }
      }
      return result
    }
    const centered = signals.map((signal) => {
      let reals = 0
      let imags = 0
      for (let index = 0; index < samples; index++) {
        const entry = (signal ?? [])[index]
        const weight = weights[index] ?? 0
        reals += (Internal.shape(entry) ? entry.re : Number(entry ?? 0)) * weight
        imags += (Internal.shape(entry) ? entry.im : 0) * weight
      }
      const first = reals / total
      const second = imags / total
      return Array.from({ length: samples }, (_outer, index) => {
        const entry = (signal ?? [])[index]
        return {
          re: (Internal.shape(entry) ? entry.re : Number(entry ?? 0)) - first,
          im: (Internal.shape(entry) ? entry.im : 0) - second
        }
      })
    })
    const result = Array.from(
      { length: signals.length },
      () => new Array<Types.NumerixComplex>(signals.length)
    )
    for (let cursor = 0; cursor < signals.length; cursor++) {
      const outer = centered[cursor]!
      for (let column = cursor; column < signals.length; column++) {
        const inner = centered[column]!
        let reals = 0
        let imags = 0
        for (let index = 0; index < samples; index++) {
          const weight = weights[index] ?? 0
          const alpha = outer[index] ?? { re: 0, im: 0 }
          const omega = inner[index] ?? { re: 0, im: 0 }
          reals += weight * (alpha.re * omega.re + alpha.im * omega.im)
          imags += weight * (alpha.im * omega.re - alpha.re * omega.im)
        }
        const first = denom === 0 ? NaN : reals / denom
        const second = cursor === column
          ? (Number.isNaN(first) ? NaN : 0)
          : denom === 0
          ? NaN
          : imags / denom
        result[cursor]![column] = { re: first, im: second }
        if (cursor !== column) {
          result[column]![cursor] = { re: first, im: second === 0 ? 0 : -second }
        }
      }
    }
    return result
  }
  const factor = Math.max(0, samples - divisor)
  return Internal.covariance(signals, (total) => (factor === 0 ? NaN : total / factor))
}
