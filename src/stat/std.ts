import * as Internal from '@app/internal/index.ts'
import variance from '@app/stat/variance.ts'

/**
 * Compute the standard deviation.
 * @description Takes the square root of the variance.
 * @param values - Values whose deviation is computed
 * @param freedom - Degrees of freedom used in the divisor
 * @param invalid - Whether invalid entries are skipped
 * @param level - Axis along which the deviation is taken
 * @returns Standard deviation for the requested axis
 */
export default function std(
  values: unknown[],
  freedom: number | boolean = 0,
  invalid: boolean | number = false,
  level?: number | boolean
): number | number[] {
  return Internal.unary(variance(values, freedom, invalid, level), Math.sqrt) as number | number[]
}
