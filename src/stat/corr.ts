import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Maths from '@app/math/index.ts'

/**
 * Compute the correlation between signals.
 * @description Measures Pearson correlation or cross-correlation.
 * @param values - First signal used in the calculation
 * @param other - Second signal used in the calculation
 * @param method - Correlation mode applied to the signals
 * @param window - Cross-correlation mode or row-variable flag
 * @returns Correlation coefficients or cross-correlation values
 */
export default function corr(
  values: (number | Types.NumerixComplex)[] | (number | Types.NumerixComplex)[][],
  other?:
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][]
    | 'pearson'
    | 'spearman'
    | 'cross'
    | boolean,
  method: 'pearson' | 'spearman' | 'cross' | boolean = 'pearson',
  window: 'valid' | 'full' | 'same' | boolean = 'valid'
): number[][] | number[] | Types.NumerixComplex[][] | Types.NumerixComplex[] {
  if (
    (typeof other === 'string' &&
      other !== 'pearson' &&
      other !== 'spearman' &&
      other !== 'cross') ||
    (typeof method === 'string' &&
      method !== 'pearson' &&
      method !== 'spearman' &&
      method !== 'cross')
  ) {
    throw new RangeError("mode must be one of 'pearson', 'spearman', or 'cross'")
  }
  const chosen: 'pearson' | 'spearman' | 'cross' = typeof other === 'string'
    ? other
    : typeof method === 'string'
    ? method
    : 'pearson'
  if (
    chosen === 'cross' &&
    !Array.isArray(values[0]) &&
    Array.isArray(other) &&
    !Array.isArray(other[0])
  ) {
    const policy = typeof window === 'string' ? window : 'valid'
    const complex = Internal.classify(values, true, true) === true ||
      Internal.classify(other, true, true) === true
    if ((values as unknown[]).length < (other as unknown[]).length) {
      const length = (values as unknown[]).length
      const series = Maths.convolve(
        other as Types.NumerixComplex[],
        Array.from({ length }, (_unused, index) => {
          const entry = (values as (number | Types.NumerixComplex)[])[length - 1 - index]
          return complex
            ? {
              re: Internal.shape(entry) ? entry.re : Number(entry ?? 0),
              im: Internal.shape(entry) ? (entry.im === 0 ? 0 : -entry.im) : 0
            }
            : Number(entry ?? 0)
        }) as Types.NumerixComplex[],
        policy
      ).reverse()
      if (complex) {
        const items = series as Types.NumerixComplex[]
        for (let index = 0; index < items.length; index++) {
          const entry = items[index]!
          entry.im = entry.im === 0 ? 0 : -entry.im
        }
      }
      return series
    }
    const length = (other as unknown[]).length
    return Maths.convolve(
      values as Types.NumerixComplex[],
      Array.from({ length }, (_unused, index) => {
        const entry = (other as (number | Types.NumerixComplex)[])[length - 1 - index]
        return complex
          ? {
            re: Internal.shape(entry) ? entry.re : Number(entry ?? 0),
            im: Internal.shape(entry) ? (entry.im === 0 ? 0 : -entry.im) : 0
          }
          : Number(entry ?? 0)
      }) as Types.NumerixComplex[],
      policy
    )
  }
  const signals = Internal.signals(
    values as number[][],
    (Array.isArray(other) ? other : undefined) as number[][] | undefined,
    typeof other === 'boolean'
      ? other
      : typeof method === 'boolean'
      ? method
      : typeof window === 'boolean'
      ? window
      : true
  )
  return Internal.covariance(
    chosen === 'spearman'
      ? signals.map((signal) => {
        const length = signal.length
        const order = Internal.indices(signal)
        if (length > 0 && Number.isNaN(signal[order[length - 1] ?? 0] ?? 0)) {
          return new Array<number>(length).fill(NaN)
        }
        const ranks = new Array<number>(length)
        let start = 0
        while (start < length) {
          let finish = start
          const target = signal[order[start] ?? 0]
          while (finish + 1 < length && signal[order[finish + 1] ?? 0] === target) {
            finish++
          }
          const average = (start + finish) / 2 + 1
          for (let cursor = start; cursor <= finish; cursor++) {
            ranks[order[cursor] ?? 0] = average
          }
          start = finish + 1
        }
        return ranks
      })
      : signals,
    (total, spread, extra) => {
      if (spread === 0 || extra === 0) {
        return total === 0 ? NaN : Math.sign(total) * Infinity
      }
      const ratio = total / (spread * extra)
      return Math.abs(ratio) > 1 - 1e-15 ? Math.sign(ratio) : ratio
    }
  )
}
