import * as Internal from '@app/internal/index.ts'

/**
 * Compute the sign of each element.
 * @description Reports sign as magnitude, boolean, or bit pattern.
 * @param value - Scalar, vector, or matrix input values
 * @param mode - Sign reporting variant applied to each element
 * @returns Sign values matching the input nesting shape
 */
export default function sign(
  value: number | number[] | number[][],
  mode?: number | number[] | 'bit' | 'pos' | 'neg'
): number | number[] | number[][] | boolean | boolean[] | boolean[][] {
  if (mode === 'bit') {
    return Internal.unary(value, (scalar) => isNeg(scalar))
  }
  if (mode === 'pos') {
    return Internal.unary(value, (scalar) => +scalar)
  }
  if (mode === 'neg') {
    return Internal.unary(value, (scalar) => -scalar)
  }
  if (mode !== undefined) {
    return Internal.broadcast(
      value,
      mode,
      (magnitude, factor) => copyOne(magnitude, factor)
    ) as number | number[] | number[][]
  }
  return Internal.unary(value, (scalar) => Math.sign(scalar))
}

/**
 * Apply a sign to a magnitude.
 * @description Copies the sign of the factor onto the magnitude.
 * @param magnitude - Absolute value to sign
 * @param factor - Value supplying the sign
 * @returns Signed magnitude
 */
function copyOne(magnitude: number, factor: number): number {
  return Math.abs(magnitude) * (isNeg(factor) ? -1 : 1)
}

/**
 * Test whether a value is negative.
 * @description Recognises negative zero alongside negative numbers.
 * @param value - Value to inspect
 * @returns True when the value is negative
 */
function isNeg(value: number): boolean {
  return value < 0 || Object.is(value, -0)
}
