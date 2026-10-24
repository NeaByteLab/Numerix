import * as Internal from '@app/internal/index.ts'

/**
 * Compute the correlation between signals.
 * @description Measures Pearson correlation or cross correlation.
 * @param values - First signal used in the calculation
 * @param partner - Second signal used in the calculation
 * @param mode - Correlation mode applied to the signals
 * @returns Correlation coefficients or cross correlation values
 */
export default function corr(
  values: number[] | number[][],
  partner?: number[],
  mode: 'pearson' | 'cross' = 'pearson'
): number[][] | number[] {
  if (mode === 'cross' && !Array.isArray(values[0]) && partner) {
    const signal = values as number[]
    const length = signal.length
    const span = partner.length
    if (length === 0 || span === 0) {
      return []
    }
    if (length >= span) {
      const valid = length - span + 1
      const result = new Array<number>(valid)
      for (let offset = 0; offset < valid; offset++) {
        let sum = 0
        for (let index = 0; index < span; index++) {
          sum += (signal[offset + index] ?? 0) * (partner[index] ?? 0)
        }
        result[offset] = sum
      }
      return result
    }
    const valid = span - length + 1
    const result = new Array<number>(valid)
    for (let offset = 0; offset < valid; offset++) {
      const shift = valid - 1 - offset
      let sum = 0
      for (let index = 0; index < length; index++) {
        sum += (signal[index] ?? 0) * (partner[shift + index] ?? 0)
      }
      result[offset] = sum
    }
    return result
  }
  return Internal.covariance(
    Internal.signals(values, partner),
    (sum, spread, other) => sum / (spread * other)
  )
}
