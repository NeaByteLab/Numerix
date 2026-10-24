/**
 * Build evenly spaced values.
 * @description Generates linear, logarithmic, or geometric spacing.
 * @param start - First value of the sequence
 * @param stop - Last value of the sequence
 * @param count - Number of values to generate
 * @param mode - Spacing mode applied to the sequence
 * @param endpoint - When true includes the stop value
 * @param base - Logarithm base for logarithmic spacing
 * @returns Array of generated values
 */
export default function space(
  start: number,
  stop: number,
  count = 50,
  mode: 'linear' | 'log' | 'geom' | boolean = 'linear',
  endpoint: boolean | 'linear' | 'log' | 'geom' = true,
  base = 10
): number[] {
  const spacing = typeof mode === 'string'
    ? mode
    : typeof endpoint === 'string'
    ? endpoint
    : 'linear'
  const endpointed = typeof mode === 'boolean'
    ? mode
    : typeof endpoint === 'boolean'
    ? endpoint
    : true
  if (count <= 0) {
    return []
  }
  if (count === 1) {
    return [spacing === 'log' ? Math.pow(base, start) : start]
  }
  const divisor = endpointed ? count - 1 : count
  const result = new Array<number>(count)
  if (spacing === 'geom') {
    if (start === 0 || stop === 0) {
      throw new RangeError('Geometric sequence cannot include zero')
    }
    const sign = start < 0 ? -1 : 1
    const from = start / sign
    const to = stop / sign
    const lower = Math.log10(from)
    const upper = Math.log10(to)
    const step = (upper - lower) / divisor
    for (let index = 0; index < count; index++) {
      result[index] = sign * Math.pow(10, lower + index * step)
    }
    result[0] = start
    if (count > 1 && endpointed) {
      result[count - 1] = stop
    }
    return result
  }
  const step = (stop - start) / divisor
  if (spacing === 'log') {
    for (let index = 0; index < count; index++) {
      result[index] = Math.pow(base, start + index * step)
    }
    if (endpointed) {
      result[count - 1] = Math.pow(base, stop)
    }
    return result
  }
  for (let index = 0; index < count; index++) {
    result[index] = start + index * step
  }
  if (endpointed) {
    result[count - 1] = stop
  }
  return result
}
