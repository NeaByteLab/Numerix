import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Replace NaN and infinite values.
 * @description Substitutes replacement values for each invalid element.
 * @param value - Scalar, vector, or matrix values to sanitize
 * @param fallback - Value used for general invalid entries
 * @param positive - Value used for positive invalid entries
 * @param negative - Value used for negative invalid entries
 * @returns Sanitized values matching the input nesting shape
 */
export default function nan(
  value: number | number[] | number[][],
  fallback?: number,
  positive?: number,
  negative?: number
): number | number[] | number[][]
/**
 * Replace complex invalid values.
 * @description Substitutes replacement values for each invalid component.
 * @param value - Complex or real values to sanitize
 * @param fallback - Value used for general invalid entries
 * @param positive - Value used for positive invalid entries
 * @param negative - Value used for negative invalid entries
 * @returns Sanitized values matching the input nesting shape
 */
export default function nan(
  value: Types.NumerixValue,
  fallback?: number,
  positive?: number,
  negative?: number
): Types.NumerixValue
/**
 * Replace NaN and infinite values.
 * @description Substitutes replacement values for each invalid element.
 * @param value - Scalar, vector, or matrix values to sanitize
 * @param fallback - Value used for general invalid entries
 * @param positive - Value used for positive invalid entries
 * @param negative - Value used for negative invalid entries
 * @returns Sanitized values matching the input nesting shape
 */
export default function nan(
  value: Types.NumerixValue,
  fallback = 0,
  positive = Number.MAX_VALUE,
  negative = -Number.MAX_VALUE
): Types.NumerixValue {
  return Internal.traverse(value, (entry) => {
    const reals = Internal.shape(entry) ? entry.re : Number(entry)
    const sanitized = Number.isNaN(reals)
      ? fallback
      : reals === Infinity
      ? positive
      : reals === -Infinity
      ? negative
      : reals
    if (!Internal.shape(entry)) {
      return sanitized
    }
    return {
      re: sanitized,
      im: Number.isNaN(entry.im)
        ? fallback
        : entry.im === Infinity
        ? positive
        : entry.im === -Infinity
        ? negative
        : entry.im
    }
  }) as Types.NumerixValue
}
