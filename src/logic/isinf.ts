import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Test whether values are infinite.
 * @description Checks each element against positive and negative infinity.
 * @param value - Scalar, vector, or matrix values to inspect
 * @param polarity - Restricts the check to one infinity sign
 * @returns Match results matching the input nesting shape
 */
export default function isinf(
  value: Types.NumerixValue,
  polarity?: 1 | -1 | 'positive' | 'negative' | 'pos' | 'neg' | '+' | '-'
): boolean | boolean[] | boolean[][] {
  if (
    polarity !== undefined &&
    polarity !== 1 &&
    polarity !== -1 &&
    polarity !== 'positive' &&
    polarity !== 'negative' &&
    polarity !== 'pos' &&
    polarity !== 'neg' &&
    polarity !== '+' &&
    polarity !== '-'
  ) {
    throw new RangeError("sign must be 1, -1, 'positive', 'negative', 'pos', 'neg', '+', or '-'")
  }
  const positive = polarity === 1 || polarity === 'positive' || polarity === 'pos' ||
    polarity === '+'
  const negative = polarity === -1 || polarity === 'negative' || polarity === 'neg' ||
    polarity === '-'
  return Internal.traverse(value, (entry) => {
    const reals = Internal.shape(entry) ? entry.re : Number(entry)
    const imags = Internal.shape(entry) ? entry.im : 0
    if (positive) {
      return reals === Infinity || imags === Infinity
    }
    if (negative) {
      return reals === -Infinity || imags === -Infinity
    }
    return (
      reals === Infinity ||
      reals === -Infinity ||
      imags === Infinity ||
      imags === -Infinity
    )
  }, false)
}
