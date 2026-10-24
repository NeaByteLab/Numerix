/**
 * Compute a polynomial domain.
 * @description Reports bounds, maps values, or trims trailing zeros.
 * @param values - Coefficients describing the domain
 * @param source - Source interval used for mapping
 * @param target - Target interval used for mapping
 * @param mode - Domain operation applied to the values
 * @param tolerance - Threshold used when trimming
 * @returns Domain bounds or mapped values
 */
export default function domain(
  values: number[],
  source?: [number, number],
  target?: [number, number],
  mode: 'bounds' | 'map' | 'parms' | 'trim' = 'bounds',
  tolerance = 0
): [number, number] | number[] {
  if (mode === 'trim') {
    let end = values.length
    while (end > 1 && Math.abs(values[end - 1] ?? 0) <= tolerance) {
      end--
    }
    return values.slice(0, end)
  }
  if (!source || !target) {
    let low = Infinity
    let high = -Infinity
    for (let index = 0; index < values.length; index++) {
      const sample = values[index] ?? 0
      if (sample < low) {
        low = sample
      }
      if (sample > high) {
        high = sample
      }
    }
    return [low, high]
  }
  const [oldStart, oldStop] = source
  const [newStart, newStop] = target
  const span = oldStop - oldStart
  const scale = (newStop - newStart) / span
  const offset = (newStart * oldStop - newStop * oldStart) / span
  if (mode === 'parms') {
    return [offset, scale]
  }
  const length = values.length
  const mapped = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    mapped[index] = offset + scale * (values[index] ?? 0)
  }
  return mapped
}
