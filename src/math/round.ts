import * as Internal from '@app/internal/index.ts'

/**
 * Round each element to nearest integer.
 * @description Applies rounding across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @param decimals - Number of decimal places to keep
 * @returns Rounded values matching the input nesting shape
 */
export default function round(
  value: number | number[] | number[][],
  decimals = 0
): number | number[] | number[][] {
  const factor = Math.pow(10, decimals)
  return Internal.unary(value, (scalar) => roundScalar(scalar, factor))
}

/**
 * Round one scalar to a multiple.
 * @description Rounds the scaled value to the nearest whole step.
 * @param scalar - Value to round
 * @param factor - Scaling factor applied before rounding
 * @returns Rounded value
 */
function roundScalar(scalar: number, factor: number): number {
  if (!Number.isFinite(scalar)) {
    return scalar
  }
  const scaled = scalar * factor
  const floored = Math.floor(scaled)
  const fraction = scaled - floored
  let rounded = 0
  if (Math.abs(fraction - 0.5) < 1e-12) {
    rounded = Math.floor(floored * 0.5) * 2 === floored ? floored : floored + 1
  } else {
    rounded = Math.round(scaled)
  }
  const result = rounded / factor
  return Object.is(result, -0) ? 0 : result
}
