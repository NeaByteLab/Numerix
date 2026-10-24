/**
 * Count occurrences of integer values.
 * @description Tallies how often each integer appears.
 * @param values - Integer values to tally
 * @param weights - Weights accumulated for each value
 * @param minimum - Lowest bin index in the result
 * @returns Bin counts for the observed values
 */
export default function bincount(
  values: number[],
  weights?: number[],
  minimum: number = 0
): number[] {
  const length = values.length
  if (length === 0) {
    return new Array(minimum).fill(0)
  }
  let peak = -Infinity
  for (let index = 0; index < length; index++) {
    const bin = Math.trunc(values[index] ?? 0)
    if (bin > peak) {
      peak = bin
    }
  }
  const total = Math.max(peak + 1, minimum)
  const counts = new Array<number>(total).fill(0)
  if (weights) {
    for (let index = 0; index < length; index++) {
      const bin = Math.trunc(values[index] ?? 0)
      if (bin >= 0) {
        counts[bin] = (counts[bin] ?? 0) + (weights[index] ?? 0)
      }
    }
    return counts
  }
  for (let index = 0; index < length; index++) {
    const bin = Math.trunc(values[index] ?? 0)
    if (bin >= 0) {
      counts[bin] = (counts[bin] ?? 0) + 1
    }
  }
  return counts
}
