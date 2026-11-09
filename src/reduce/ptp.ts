import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Maths from '@app/math/index.ts'

/**
 * Compute the peak-to-peak range.
 * @description Subtracts the minimum from the maximum.
 * @param values - Values whose range is computed
 * @param level - Axis along which the range is taken
 * @returns Range of values for the requested axis
 */
export default function ptp(
  values: unknown[],
  level?: number | null
): number | number[] | Types.NumerixComplex | Types.NumerixComplex[] {
  const upper = Internal.extreme(values, level ?? undefined, false, undefined, 'max')
  const lower = Internal.extreme(values, level ?? undefined, false, undefined, 'min')
  if (typeof upper === 'number' && typeof lower === 'number') {
    return upper - lower
  }
  if (
    Array.isArray(upper) &&
    Array.isArray(lower) &&
    typeof upper[0] === 'number' &&
    typeof lower[0] === 'number'
  ) {
    return (upper as number[]).map((entry, index) => entry - ((lower as number[])[index] ?? 0))
  }
  return Maths.sub(upper as number, lower as number) as
    | number
    | number[]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
}
