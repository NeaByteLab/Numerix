/**
 * Compute the gradient of sampled values.
 * @description Estimates derivatives from adjacent sample differences.
 * @param samples - Sampled values to differentiate
 * @param spacing - Distance between consecutive samples
 * @returns Gradient estimates for each interior sample
 */
export default function gradient(samples: number[], spacing = 1): number[] {
  const count = samples.length
  if (count === 0) {
    return []
  }
  if (count === 1) {
    return [0]
  }
  const result = new Array<number>(count)
  const inverse = 1 / spacing
  const half = 0.5 * inverse
  result[0] = ((samples[1] ?? 0) - (samples[0] ?? 0)) * inverse
  const last = count - 1
  for (let index = 1; index < last; index++) {
    result[index] = ((samples[index + 1] ?? 0) - (samples[index - 1] ?? 0)) * half
  }
  result[last] = ((samples[last] ?? 0) - (samples[last - 1] ?? 0)) * inverse
  return result
}
