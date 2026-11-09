/**
 * Unwrap a two-dimensional phase matrix.
 * @description Removes jumps larger than the discontinuity threshold.
 * @param samples - Two-dimensional phase samples in radians to unwrap
 * @param discontinuity - Threshold that marks a phase jump
 * @param period - Wrapping period of the phase values
 * @param along - Axis along which to unwrap two-dimensional matrices
 * @returns Unwrapped two-dimensional phase matrix
 */
export default function unwrap(
  samples: number[][],
  discontinuity?: number,
  period?: number,
  along?: number
): number[][]
/**
 * Unwrap a one-dimensional phase vector.
 * @description Removes jumps larger than the discontinuity threshold.
 * @param samples - One-dimensional phase samples in radians to unwrap
 * @param discontinuity - Threshold that marks a phase jump
 * @param period - Wrapping period of the phase values
 * @param along - Axis along which to unwrap
 * @returns Unwrapped one-dimensional phase vector
 */
export default function unwrap(
  samples: number[],
  discontinuity?: number,
  period?: number,
  along?: number
): number[]
/**
 * Unwrap a phase sequence.
 * @description Removes jumps larger than the discontinuity threshold.
 * @param samples - One-dimensional or two-dimensional phase samples in radians to unwrap
 * @param discontinuity - Threshold that marks a phase jump
 * @param period - Wrapping period of the phase values
 * @param along - Axis along which to unwrap two-dimensional matrices
 * @returns Unwrapped phase values matching the input shape
 */
export default function unwrap(
  samples: number[] | number[][],
  discontinuity?: number,
  period?: number,
  along?: number
): number[] | number[][] {
  const vector = !Array.isArray(samples[0])
  const flagged = along === undefined &&
    (period === 0 || period === -1 ||
      (!vector && (period === -2 || (discontinuity !== undefined && period === 1))))
  const cycle = flagged || period === undefined ? 2 * Math.PI : period
  const chosen = flagged ? period : (along ?? -1)
  const resolved = chosen < 0 ? (vector ? 1 : 2) + chosen : chosen
  if (resolved < 0 || resolved >= (vector ? 1 : 2)) {
    throw new RangeError('axis out of bounds')
  }
  const middle = cycle * 0.5
  const threshold = discontinuity === undefined ? middle : Math.max(discontinuity, middle)
  if (!vector) {
    const matrix = samples as number[][]
    if (resolved === 1) {
      return matrix.map((slice) => unwrap(slice ?? [], discontinuity, cycle, 0) as number[])
    }
    const height = matrix.length
    const width = matrix[0]?.length ?? 0
    if (width === 0) {
      return matrix.map(() => [])
    }
    const result = Array.from({ length: height }, () => new Array<number>(width))
    for (let column = 0; column < width; column++) {
      let offset = 0
      let prior = matrix[0]?.[column] ?? 0
      const initial = result[0]
      if (initial) {
        initial[column] = prior
      }
      for (let outer = 1; outer < height; outer++) {
        const value = matrix[outer]?.[column] ?? 0
        const delta = value - prior
        prior = value
        const quotient = (delta + middle) / cycle
        let mapped = (quotient - Math.floor(quotient)) * cycle - middle
        if (Object.is(mapped, -middle) && delta > 0) {
          mapped = middle
        }
        if (Math.abs(delta) > threshold) {
          offset += mapped - delta
        }
        const target = result[outer]
        if (target) {
          target[column] = value + offset
        }
      }
    }
    return result
  }
  let offset = 0
  let prior = 0
  return (samples as number[]).map((current, index) => {
    const value = current ?? 0
    if (index === 0) {
      prior = value
      return value
    }
    const delta = value - prior
    prior = value
    const quotient = (delta + middle) / cycle
    let mapped = (quotient - Math.floor(quotient)) * cycle - middle
    if (Object.is(mapped, -middle) && delta > 0) {
      mapped = middle
    }
    if (Math.abs(delta) > threshold) {
      offset += mapped - delta
    }
    return value + offset
  })
}
