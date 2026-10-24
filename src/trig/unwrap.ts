/**
 * Unwrap a phase sequence.
 * @description Removes jumps larger than the discontinuity threshold.
 * @param phases - Phase samples in radians to unwrap
 * @param discontinuity - Threshold that marks a phase jump
 * @param period - Wrapping period of the phase values
 * @returns Unwrapped phase values in radians
 */
export default function unwrap(
  phases: number[],
  discontinuity = Math.PI,
  period = 2 * Math.PI
): number[] {
  const length = phases.length
  if (length === 0) {
    return []
  }
  const unwrapped = new Array<number>(length)
  unwrapped[0] = phases[0] ?? 0
  const half = period * 0.5
  let offset = 0
  for (let index = 1; index < length; index++) {
    const current = phases[index] ?? 0
    const previous = phases[index - 1] ?? 0
    const delta = current - previous
    const remapped = ((((delta + half) % period) + period) % period) - half
    const corrected = remapped === -half && delta > 0 ? half : remapped
    if (Math.abs(delta) >= discontinuity) {
      offset += corrected - delta
    }
    unwrapped[index] = current + offset
  }
  return unwrapped
}
