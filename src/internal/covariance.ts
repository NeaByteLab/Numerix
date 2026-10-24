import kernel from '@app/internal/kernel.ts'

/**
 * Build a matrix from centered signals.
 * @description Centers each signal and pairs them through a divisor.
 * @param rows - Signals to center and pair
 * @param divisor - Turns a cross product into a matrix entry
 * @returns Matrix of the paired signals
 */
export default function covariance(
  rows: number[][],
  divisor: (sum: number, spread: number, other: number) => number
): number[][] {
  const count = rows.length
  const samples = rows[0]?.length ?? 0
  const centered = new Array<Float64Array>(count)
  const spreads = new Array<number>(count)
  for (let variable = 0; variable < count; variable++) {
    const row = rows[variable] ?? []
    let sum = 0
    for (let sample = 0; sample < samples; sample++) {
      sum += row[sample] ?? 0
    }
    const mean = sum / samples
    const offsets = new Float64Array(samples)
    let squared = 0
    for (let sample = 0; sample < samples; sample++) {
      const difference = (row[sample] ?? 0) - mean
      offsets[sample] = difference
      squared += difference * difference
    }
    centered[variable] = offsets
    spreads[variable] = Math.sqrt(squared)
  }
  const matrix = kernel(centered, count, samples)
  for (let row = 0; row < count; row++) {
    const target = matrix[row]
    for (let column = row; column < count; column++) {
      const value = divisor(
        target?.[column] ?? 0,
        spreads[row] ?? 1,
        spreads[column] ?? 1
      )
      if (target) {
        target[column] = value
      }
      const symmetric = matrix[column]
      if (symmetric) {
        symmetric[row] = value
      }
    }
  }
  return matrix
}
