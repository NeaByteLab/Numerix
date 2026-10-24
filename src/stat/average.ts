/**
 * Compute a weighted average.
 * @description Averages values using optional weights.
 * @param left - Values to average
 * @param weights - Weights applied to each value
 * @returns Weighted average of the given values
 */
export default function average(left: number[], weights?: number[]): number {
  const length = left.length
  if (length === 0) {
    return NaN
  }
  if (!weights) {
    let sum = 0
    for (let index = 0; index < length; index++) {
      sum += left[index] ?? 0
    }
    return sum / length
  }
  let total = 0
  let weight = 0
  for (let index = 0; index < length; index++) {
    const factor = weights[index] ?? 0
    total += (left[index] ?? 0) * factor
    weight += factor
  }
  return total / weight
}
