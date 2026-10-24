/**
 * Integrate sampled values numerically.
 * @description Applies trapezoidal integration over vector or matrix samples.
 * @param samples - Sampled values to integrate
 * @param points - Optional integration boundaries within the samples
 * @param spacing - Distance between consecutive samples
 * @returns Integral of the sampled values
 */
export default function integrate(
  samples: number[] | number[][],
  points?: number[] | number,
  spacing = 1
): number | number[] {
  if (Array.isArray(samples[0])) {
    const matrix = samples as number[][]
    const rows = matrix.length
    const result = new Array<number>(rows)
    for (let row = 0; row < rows; row++) {
      result[row] = integrate1D(matrix[row] ?? [], points, spacing)
    }
    return result
  }
  return integrate1D(samples as number[], points, spacing)
}

/**
 * Integrate a flat vector of samples.
 * @description Applies trapezoidal integration over the samples.
 * @param samples - Sampled values to integrate
 * @param points - Integration boundaries within the samples
 * @param spacing - Distance between consecutive samples
 * @returns Integral of the sampled values
 */
function integrate1D(
  samples: number[],
  points?: number[] | number,
  spacing = 1
): number {
  const length = samples.length
  if (length < 2) {
    return 0
  }
  if (Array.isArray(points)) {
    let area = 0
    for (let index = 1; index < length; index++) {
      const step = (points[index] ?? 0) - (points[index - 1] ?? 0)
      area += ((samples[index] ?? 0) + (samples[index - 1] ?? 0)) * step
    }
    return 0.5 * area
  }
  const width = typeof points === 'number' ? points : spacing
  const last = length - 1
  let total = 0
  for (let index = 1; index < last; index++) {
    total += samples[index] ?? 0
  }
  return width * (0.5 * ((samples[0] ?? 0) + (samples[last] ?? 0)) + total)
}
