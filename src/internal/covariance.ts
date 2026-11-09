import type * as Types from '@app/types.ts'
import classify from '@app/internal/classify.ts'
import kernel from '@app/internal/kernel.ts'
import shape from '@app/internal/shape.ts'
import total from '@app/internal/total.ts'

/**
 * Build a matrix from centered signals.
 * @description Centers each signal and pairs them through a divisor.
 * @param signals - Signals to center and pair
 * @param divisor - Callback that scales each inner product into a matrix entry
 * @returns Matrix of the paired signals
 */
export default function covariance(
  signals: unknown[][],
  divisor: (total: number, spread: number, other: number) => number
): number[][] | Types.NumerixComplex[][] {
  const count = signals.length
  const samples = signals[0]?.length ?? 0
  if (classify(signals, true, true) === true) {
    const spreads = new Array<number>(count)
    const centered = Array.from({ length: count }, (_outer, variable) => {
      const stats = total(signals[variable] ?? [], false)
      const average = stats.sum / samples
      const imaginary = stats.imags / samples
      let squared = 0
      const offsets = Array.from({ length: samples }, (_inner, sample) => {
        const entry = (signals[variable] ?? [])[sample]
        const first = (shape(entry) ? entry.re : Number(entry ?? 0)) - average
        const second = (shape(entry) ? entry.im : 0) - imaginary
        squared += first * first + second * second
        return { re: first, im: second }
      })
      spreads[variable] = Math.sqrt(squared)
      return offsets
    })
    const matrix = Array.from({ length: count }, () => new Array<Types.NumerixComplex>(count))
    for (let outer = 0; outer < count; outer++) {
      const spread = spreads[outer] ?? 1
      for (let column = outer; column < count; column++) {
        const other = spreads[column] ?? 1
        let reals = 0
        let imags = 0
        for (let sample = 0; sample < samples; sample++) {
          const alpha = centered[outer]?.[sample] ?? { re: 0, im: 0 }
          const omega = centered[column]?.[sample] ?? { re: 0, im: 0 }
          reals += alpha.re * omega.re + alpha.im * omega.im
          imags += alpha.im * omega.re - alpha.re * omega.im
        }
        const first = divisor(reals, spread, other)
        const second = outer === column
          ? (Number.isNaN(first) ? NaN : 0)
          : divisor(imags, spread, other)
        matrix[outer]![column] = { re: first, im: second }
        if (outer !== column) {
          matrix[column]![outer] = {
            re: first,
            im: second === 0 ? 0 : -second
          }
        }
      }
    }
    return matrix
  }
  const spreads = new Array<number>(count)
  const matrix = kernel(
    Array.from({ length: count }, (_outer, variable) => {
      const signal = (signals[variable] ?? []) as number[]
      const average = total(signal, false).sum / samples
      let squared = 0
      const offsets = Float64Array.from({ length: samples }, (_inner, sample) => {
        const difference = (signal[sample] ?? 0) - average
        squared += difference * difference
        return difference
      })
      spreads[variable] = Math.sqrt(squared)
      return offsets
    }),
    count,
    samples
  )
  for (let outer = 0; outer < count; outer++) {
    const target = matrix[outer]
    const spread = spreads[outer] ?? 1
    for (let column = outer; column < count; column++) {
      const value = divisor(
        target?.[column] ?? 0,
        spread,
        spreads[column] ?? 1
      )
      if (target) {
        target[column] = value
      }
      if (matrix[column]) {
        matrix[column]![outer] = value
      }
    }
  }
  return matrix
}
