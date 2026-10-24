import * as Internal from '@app/internal/index.ts'

/**
 * Replace not a number values.
 * @description Substitutes replacement values for each invalid element.
 * @param value - Scalar, vector, or matrix values to sanitize
 * @param fallback - Value used for general invalid entries
 * @param positive - Value used for positive invalid entries
 * @param negative - Value used for negative invalid entries
 * @returns Sanitized values matching the input nesting shape
 */
export default function nan(
  value: number | number[] | number[][],
  fallback = 0,
  positive = Number.MAX_VALUE,
  negative = -Number.MAX_VALUE
): number | number[] | number[][] {
  return Internal.unary(value, (numeric) => {
    if (Number.isNaN(numeric)) {
      return fallback
    }
    if (numeric === Infinity) {
      return positive
    }
    if (numeric === -Infinity) {
      return negative
    }
    return numeric
  })
}
