import variance from '@app/stat/variance.ts'

/**
 * Compute the standard deviation.
 * @description Takes the square root of the variance.
 * @param left - Values whose deviation is computed
 * @param freedom - Degrees of freedom used in the divisor
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the deviation is taken
 * @returns Standard deviation for the requested axis
 */
export default function std(
  left: unknown[],
  freedom: number | boolean = 0,
  nan: boolean | number = false,
  axis?: number
): number | number[] {
  const result = variance(left, freedom, nan, axis)
  if (Array.isArray(result)) {
    const length = result.length
    const deviations = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      deviations[index] = Math.sqrt(result[index] ?? 0)
    }
    return deviations
  }
  return Math.sqrt(result)
}
