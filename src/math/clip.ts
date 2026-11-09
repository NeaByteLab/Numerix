import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Limit matrix elements to a range.
 * @description Clamps matrix entries between lower and upper bounds.
 * @param value - Matrix input values
 * @param lower - Lower bound applied to each element
 * @param upper - Upper bound applied to each element
 * @returns Clamped matrix values
 */
export default function clip(
  value: number[][],
  lower?: number | number[] | number[][] | null,
  upper?: number | number[] | number[][] | null
): number[][]
/**
 * Limit vector elements to a range.
 * @description Clamps vector entries between lower and upper bounds.
 * @param value - Vector input values
 * @param lower - Lower bound applied to each element
 * @param upper - Upper bound applied to each element
 * @returns Clamped vector values
 */
export default function clip(
  value: number[],
  lower?: number | number[] | null,
  upper?: number | number[] | null
): number[]
/**
 * Limit a scalar value to a range.
 * @description Clamps a scalar between lower and upper bounds.
 * @param value - Scalar input value
 * @param lower - Lower bound applied to the value
 * @param upper - Upper bound applied to the value
 * @returns Clamped scalar value
 */
export default function clip(
  value: number,
  lower?: number | null,
  upper?: number | null
): number
/**
 * Limit complex elements to a range.
 * @description Clamps entries lexicographically between lower and upper bounds.
 * @param value - Complex or real input values
 * @param lower - Lower bound applied to each element
 * @param upper - Upper bound applied to each element
 * @returns Clamped values matching the input nesting shape
 */
export default function clip(
  value: Types.NumerixValue,
  lower?: Types.NumerixValue | null,
  upper?: Types.NumerixValue | null
): Types.NumerixValue
/**
 * Limit each element to a range.
 * @description Clamps nested numeric inputs between lower and upper bounds.
 * @param value - Scalar, vector, or matrix input values
 * @param lower - Lower bound applied to each element
 * @param upper - Upper bound applied to each element
 * @returns Clamped values matching the input nesting shape
 */
export default function clip(
  value: Types.NumerixValue,
  lower?: Types.NumerixValue | null,
  upper?: Types.NumerixValue | null
): Types.NumerixValue {
  if (
    typeof lower === 'number' &&
    typeof upper === 'number' &&
    Internal.classify(value, true, true) === false
  ) {
    if (typeof value === 'number') {
      if (Number.isNaN(value) || Number.isNaN(lower) || Number.isNaN(upper)) {
        return NaN
      }
      const floored = value < lower || (value === 0 && lower === 0 && Object.is(value, -0))
        ? lower
        : value
      return floored > upper || (floored === 0 && upper === 0 && Object.is(upper, -0))
        ? upper
        : floored
    }
    return Internal.mapper(value as number[] | number[][], (entry) => {
      if (Number.isNaN(entry) || Number.isNaN(lower) || Number.isNaN(upper)) {
        return NaN
      }
      const floored = entry < lower || (entry === 0 && lower === 0 && Object.is(entry, -0))
        ? lower
        : entry
      return floored > upper || (floored === 0 && upper === 0 && Object.is(upper, -0))
        ? upper
        : floored
    })
  }
  let current: unknown = value
  if (lower !== undefined && lower !== null) {
    current = Internal.pair(current, lower, false, 'max')
  }
  if (upper !== undefined && upper !== null) {
    current = Internal.pair(current, upper, false, 'min')
  }
  if (
    (lower === undefined || lower === null) &&
    (upper === undefined || upper === null) &&
    Internal.classify(value, true, true) === true
  ) {
    return Internal.nested(current) as unknown as Types.NumerixValue
  }
  return current as Types.NumerixValue
}
